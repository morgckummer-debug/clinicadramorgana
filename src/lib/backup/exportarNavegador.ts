/**
 * Backup gerado no navegador, pelo botão do painel.
 *
 * Usa a sessão da secretária que já está logada — nenhuma chave especial, nada
 * para configurar. O arquivo sai no formato de `formato.ts`, o mesmo do robô
 * diário, então o `scripts/supabase-restore.ts` restaura os dois do mesmo jeito.
 *
 * Aqui o arquivo NÃO é criptografado: ele vai direto para a pasta de downloads
 * do computador de quem clicou, e não passa por servidor nenhum.
 */
import { supabase, supabaseUrl } from '@/lib/supabase'
import {
  BUCKET_BACKUP,
  TABELAS_BACKUP,
  montarBackup,
  nomeArquivoBackup,
  type ArquivoBackup,
  type BackupPayload,
  type LinhaBackup,
} from './formato'

const PAGINA = 1000

export interface ProgressoBackup {
  etapa: string
  feito: number
  total: number
}

/** Blob → base64, em pedaços: `String.fromCharCode(...bytes)` estoura a pilha com arquivos grandes. */
async function paraBase64(blob: Blob): Promise<string> {
  const bytes = new Uint8Array(await blob.arrayBuffer())
  let binario = ''
  for (let i = 0; i < bytes.length; i += 8192) {
    binario += String.fromCharCode(...bytes.subarray(i, i + 8192))
  }
  return btoa(binario)
}

async function lerTabela(tabela: string): Promise<LinhaBackup[]> {
  const linhas: LinhaBackup[] = []
  for (let offset = 0; ; offset += PAGINA) {
    // Ordena por id para a paginação ser estável entre as consultas.
    const { data, error } = await supabase
      .from(tabela)
      .select('*')
      .order('id', { ascending: true })
      .range(offset, offset + PAGINA - 1)
    if (error) throw new Error(`Erro ao ler ${tabela}: ${error.message}`)
    const pagina = (data ?? []) as LinhaBackup[]
    linhas.push(...pagina)
    if (pagina.length < PAGINA) return linhas
  }
}

async function listarArquivos(prefixo = ''): Promise<{ caminho: string; tamanho: number; tipo: string | null }[]> {
  const achados: { caminho: string; tamanho: number; tipo: string | null }[] = []
  for (let offset = 0; ; offset += PAGINA) {
    const { data, error } = await supabase.storage
      .from(BUCKET_BACKUP)
      .list(prefixo, { limit: PAGINA, offset, sortBy: { column: 'name', order: 'asc' } })
    if (error) throw new Error(`Erro ao listar os pedidos médicos: ${error.message}`)
    const itens = data ?? []
    for (const item of itens) {
      const caminho = prefixo ? `${prefixo}/${item.name}` : item.name
      // Item sem id é pasta.
      if (item.id === null) achados.push(...(await listarArquivos(caminho)))
      else achados.push({
        caminho,
        tamanho: item.metadata?.size ?? 0,
        tipo: item.metadata?.mimetype ?? null,
      })
    }
    if (itens.length < PAGINA) return achados
  }
}

export async function gerarBackupNoNavegador(opcoes: {
  incluirArquivos: boolean
  onProgresso?: (p: ProgressoBackup) => void
}): Promise<BackupPayload> {
  const avisar = opcoes.onProgresso ?? (() => {})

  const tabelas: Record<string, LinhaBackup[]> = {}
  for (let i = 0; i < TABELAS_BACKUP.length; i++) {
    const tabela = TABELAS_BACKUP[i]
    avisar({ etapa: `Lendo ${tabela.replace('_', '-')}`, feito: i, total: TABELAS_BACKUP.length })
    tabelas[tabela] = await lerTabela(tabela)
  }

  const arquivos: ArquivoBackup[] = []
  if (opcoes.incluirArquivos) {
    avisar({ etapa: 'Procurando os pedidos médicos', feito: 0, total: 1 })
    const listagem = await listarArquivos()

    for (let i = 0; i < listagem.length; i++) {
      const item = listagem[i]
      avisar({ etapa: 'Baixando os pedidos médicos', feito: i, total: listagem.length })
      try {
        const { data, error } = await supabase.storage.from(BUCKET_BACKUP).download(item.caminho)
        if (error || !data) throw new Error(error?.message ?? 'arquivo vazio')
        arquivos.push({
          caminho: item.caminho,
          bucket: BUCKET_BACKUP,
          tamanho: data.size,
          tipo: item.tipo ?? data.type ?? null,
          conteudo_base64: await paraBase64(data),
        })
      } catch (e) {
        // Um anexo problemático não pode impedir o backup do resto.
        arquivos.push({
          caminho: item.caminho,
          bucket: BUCKET_BACKUP,
          tamanho: item.tamanho,
          tipo: item.tipo,
          conteudo_base64: null,
          erro: (e as Error).message,
        })
      }
    }
  }

  avisar({ etapa: 'Montando o arquivo', feito: 1, total: 1 })
  return montarBackup({ origem: 'painel', projetoUrl: supabaseUrl, tabelas, arquivos })
}

/** Salva o backup na pasta de downloads do computador. */
export function baixarBackup(payload: BackupPayload): string {
  const nome = nomeArquivoBackup('json')
  const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nome
  document.body.appendChild(a)
  a.click()
  a.remove()
  // Espera o navegador começar o download antes de soltar a memória do blob.
  setTimeout(() => URL.revokeObjectURL(url), 60_000)
  return nome
}
