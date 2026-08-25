/**
 * Cliente REST mínimo do Supabase para os scripts de manutenção.
 *
 * Não usa `@supabase/supabase-js` de propósito: assim os scripts rodam com
 * `bun run scripts/...` sem `bun install`, inclusive num computador onde o
 * projeto nunca foi instalado — que é justamente a situação de quem está
 * restaurando um backup às pressas.
 */
import type { ArquivoBackup, LinhaBackup } from '../../src/lib/backup/formato'

/** Projeto em uso. O mesmo valor de src/lib/supabase.ts. */
export const URL_PADRAO = 'https://hbrjufcagpibatxhzgtc.supabase.co'

/** Chave anon do projeto — pública por natureza, vai no bundle do site. */
export const ANON_PADRAO =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhicmp1ZmNhZ3BpYmF0eGh6Z3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1OTQwNDcsImV4cCI6MjEwMzE3MDA0N30.YSx4IQC-4kJrxSL8TiREtvA1U9d9tAS9EjABl-Zz9eM'

const PAGINA = 1000

export class ProjetoIndisponivelError extends Error {
  constructor(detalhe: string) {
    super(
      `O projeto Supabase não respondeu (${detalhe}).\n` +
        'Se ele estiver PAUSADO por inatividade, abra https://supabase.com/dashboard, ' +
        'entre no projeto e clique em "Restore project" — os dados voltam com ele.',
    )
    this.name = 'ProjetoIndisponivelError'
  }
}

export interface Cliente {
  url: string
  chave: string
  /** true quando a chave é service_role (lê e escreve passando por cima do RLS). */
  privilegiada: boolean
}

export function criarCliente(url: string, chave: string): Cliente {
  const limpa = url.trim().replace(/\/+$/, '')
  if (!/^https:\/\//.test(limpa)) {
    throw new Error(`URL do Supabase inválida: ${JSON.stringify(url)} (precisa começar com https://).`)
  }
  return { url: limpa, chave: chave.trim(), privilegiada: ehServiceRole(chave) }
}

/** Lê o papel de dentro do JWT, sem validar assinatura — só para avisar o usuário. */
export function ehServiceRole(chave: string): boolean {
  try {
    const corpo = JSON.parse(Buffer.from(chave.split('.')[1], 'base64url').toString('utf8'))
    return corpo?.role === 'service_role'
  } catch {
    return false
  }
}

async function chamar(c: Cliente, caminho: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers)
  headers.set('apikey', c.chave)
  headers.set('Authorization', `Bearer ${c.chave}`)

  let resposta: Response
  try {
    resposta = await fetch(`${c.url}${caminho}`, { ...init, headers })
  } catch (e) {
    throw new ProjetoIndisponivelError((e as Error).message)
  }
  // 5xx do gateway é o sintoma típico de projeto pausado ou dormindo.
  if (resposta.status >= 500) {
    throw new ProjetoIndisponivelError(`HTTP ${resposta.status} em ${caminho}`)
  }
  return resposta
}

async function erroDe(resposta: Response, contexto: string): Promise<Error> {
  const texto = await resposta.text().catch(() => '')
  return new Error(`${contexto}: HTTP ${resposta.status} ${resposta.statusText} ${texto}`.trim())
}

/** Chama uma função SQL (RPC). */
export async function rpc(c: Cliente, nome: string, argumentos: Record<string, unknown> = {}): Promise<unknown> {
  const r = await chamar(c, `/rest/v1/rpc/${nome}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(argumentos),
  })
  if (!r.ok) throw await erroDe(r, `Falha ao chamar ${nome}()`)
  const texto = await r.text()
  return texto ? JSON.parse(texto) : null
}

/**
 * Baixa a tabela inteira, de mil em mil.
 *
 * Ordena por `id` para a paginação ser estável: sem ordem definida, o Postgres
 * pode devolver a mesma linha em duas páginas e sumir com outra.
 */
export async function listarLinhas(c: Cliente, tabela: string): Promise<LinhaBackup[]> {
  const linhas: LinhaBackup[] = []
  for (let offset = 0; ; offset += PAGINA) {
    const r = await chamar(
      c,
      `/rest/v1/${tabela}?select=*&order=id.asc&limit=${PAGINA}&offset=${offset}`,
    )
    if (!r.ok) throw await erroDe(r, `Falha ao ler a tabela ${tabela}`)
    const pagina = (await r.json()) as LinhaBackup[]
    linhas.push(...pagina)
    if (pagina.length < PAGINA) return linhas
  }
}

/** Grava linhas preservando o `id` original (upsert pela chave primária). */
export async function gravarLinhas(c: Cliente, tabela: string, linhas: LinhaBackup[]): Promise<number> {
  let gravadas = 0
  for (let i = 0; i < linhas.length; i += 200) {
    const lote = linhas.slice(i, i + 200)
    const r = await chamar(c, `/rest/v1/${tabela}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify(lote),
    })
    if (!r.ok) throw await erroDe(r, `Falha ao gravar em ${tabela}`)
    gravadas += lote.length
  }
  return gravadas
}

interface ItemStorage {
  name: string
  id: string | null
  metadata: { size?: number; mimetype?: string } | null
}

/** Lista o bucket inteiro, entrando nas subpastas. */
export async function listarArquivos(c: Cliente, bucket: string, prefixo = ''): Promise<
  { caminho: string; tamanho: number; tipo: string | null }[]
> {
  const achados: { caminho: string; tamanho: number; tipo: string | null }[] = []

  for (let offset = 0; ; offset += PAGINA) {
    const r = await chamar(c, `/storage/v1/object/list/${bucket}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prefix: prefixo,
        limit: PAGINA,
        offset,
        sortBy: { column: 'name', order: 'asc' },
      }),
    })
    if (!r.ok) throw await erroDe(r, `Falha ao listar o bucket ${bucket}`)
    const itens = (await r.json()) as ItemStorage[]

    for (const item of itens) {
      const caminho = prefixo ? `${prefixo}/${item.name}` : item.name
      // Item sem id é pasta: o Storage devolve as subpastas junto dos arquivos.
      if (item.id === null) achados.push(...(await listarArquivos(c, bucket, caminho)))
      else achados.push({
        caminho,
        tamanho: item.metadata?.size ?? 0,
        tipo: item.metadata?.mimetype ?? null,
      })
    }

    if (itens.length < PAGINA) return achados
  }
}

export async function baixarArquivo(c: Cliente, bucket: string, caminho: string): Promise<Buffer> {
  const r = await chamar(c, `/storage/v1/object/${bucket}/${encodeURI(caminho)}`)
  if (!r.ok) throw await erroDe(r, `Falha ao baixar ${caminho}`)
  return Buffer.from(await r.arrayBuffer())
}

export async function enviarArquivo(
  c: Cliente,
  bucket: string,
  arquivo: ArquivoBackup,
): Promise<void> {
  if (arquivo.conteudo_base64 === null) {
    throw new Error(`O arquivo ${arquivo.caminho} veio sem conteúdo no backup (${arquivo.erro ?? 'motivo não registrado'}).`)
  }
  const r = await chamar(c, `/storage/v1/object/${bucket}/${encodeURI(arquivo.caminho)}`, {
    method: 'POST',
    headers: {
      'Content-Type': arquivo.tipo ?? 'application/octet-stream',
      'x-upsert': 'true',
    },
    body: Buffer.from(arquivo.conteudo_base64, 'base64'),
  })
  if (!r.ok) throw await erroDe(r, `Falha ao enviar ${arquivo.caminho}`)
}
