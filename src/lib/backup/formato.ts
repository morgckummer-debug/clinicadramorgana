/**
 * Formato do arquivo de backup do banco.
 *
 * O mesmo formato é produzido pelos dois caminhos — o botão "Baixar backup" do
 * painel e o robô diário do GitHub Actions — e consumido pelo
 * `scripts/supabase-restore.ts`. Por isso ele mora aqui, num módulo puro
 * (sem `node:` e sem `supabase-js`), que os dois lados conseguem importar.
 *
 * As linhas são guardadas como objetos crus, sem tipagem coluna a coluna, de
 * propósito: se amanhã alguém acrescentar uma coluna no banco, o backup
 * continua levando ela junto sem precisar mexer aqui.
 */

/** Sobe quando a estrutura do arquivo mudar de um jeito que quebre a leitura. */
export const VERSAO_BACKUP = 1

export const FORMATO_BACKUP = 'clinica-dra-morgana/backup'

/** Tabelas que compõem um backup completo, na ordem em que devem ser restauradas. */
export const TABELAS_BACKUP = ['pacientes', 'pre_agendamentos'] as const

/** Bucket dos pedidos médicos enviados pelo formulário. */
export const BUCKET_BACKUP = 'pedidos'

export type LinhaBackup = Record<string, unknown>

export interface ArquivoBackup {
  /** Caminho dentro do bucket, como o Storage guarda. */
  caminho: string
  bucket: string
  /** Bytes do arquivo original (antes do base64). */
  tamanho: number
  tipo: string | null
  /** Conteúdo em base64. `null` quando o download falhou — veja `erro`. */
  conteudo_base64: string | null
  erro?: string
}

export interface BackupPayload {
  formato: typeof FORMATO_BACKUP
  versao: number
  gerado_em: string
  /** Quem gerou: o painel da secretária ou o robô diário. */
  origem: 'painel' | 'github-actions' | string
  /** Projeto Supabase de onde os dados saíram. */
  projeto_url: string
  tabelas: Record<string, LinhaBackup[]>
  arquivos: ArquivoBackup[]
  aviso: string
}

export const AVISO_LGPD =
  'Este arquivo contém dados pessoais e de saúde de pacientes (nome, CPF, ' +
  'telefone, pedidos médicos). Guarde-o em local seguro, não envie por ' +
  'e-mail, WhatsApp ou qualquer serviço público, e apague as cópias que não ' +
  'forem mais necessárias.'

export function montarBackup(dados: {
  origem: string
  projetoUrl: string
  tabelas: Record<string, LinhaBackup[]>
  arquivos: ArquivoBackup[]
  geradoEm?: Date
}): BackupPayload {
  return {
    formato: FORMATO_BACKUP,
    versao: VERSAO_BACKUP,
    gerado_em: (dados.geradoEm ?? new Date()).toISOString(),
    origem: dados.origem,
    projeto_url: dados.projetoUrl,
    tabelas: dados.tabelas,
    arquivos: dados.arquivos,
    aviso: AVISO_LGPD,
  }
}

export interface ResumoBackup {
  gerado_em: string
  origem: string
  projeto_url: string
  linhas: Record<string, number>
  arquivos: number
  arquivos_com_erro: number
  bytes_arquivos: number
}

/**
 * Contagens do backup, sem nenhum dado de paciente.
 *
 * É o que vai no resumo em texto puro que acompanha o backup criptografado:
 * dá para conferir que a rodada de ontem levou tudo sem precisar da senha.
 */
export function resumirBackup(p: BackupPayload): ResumoBackup {
  const linhas: Record<string, number> = {}
  for (const [tabela, valores] of Object.entries(p.tabelas)) {
    linhas[tabela] = valores.length
  }
  return {
    gerado_em: p.gerado_em,
    origem: p.origem,
    projeto_url: p.projeto_url,
    linhas,
    arquivos: p.arquivos.length,
    arquivos_com_erro: p.arquivos.filter((a) => a.conteudo_base64 === null).length,
    bytes_arquivos: p.arquivos.reduce((soma, a) => soma + (a.tamanho || 0), 0),
  }
}

/**
 * Confere que o objeto lido do disco é mesmo um backup que dá para restaurar.
 *
 * Restaurar é o momento mais frágil de todos — costuma acontecer com o banco
 * já perdido e a pessoa com pressa. Um erro claro aqui vale mais do que uma
 * exceção obscura no meio da importação.
 */
export function validarBackup(valor: unknown): BackupPayload {
  if (typeof valor !== 'object' || valor === null) {
    throw new Error('Arquivo de backup inválido: o conteúdo não é um objeto JSON.')
  }
  const p = valor as Partial<BackupPayload>

  if (p.formato !== FORMATO_BACKUP) {
    throw new Error(
      `Arquivo de backup inválido: esperava formato "${FORMATO_BACKUP}", veio "${String(p.formato)}".`,
    )
  }
  if (typeof p.versao !== 'number' || p.versao > VERSAO_BACKUP) {
    throw new Error(
      `Backup na versão ${String(p.versao)} — esta cópia do projeto só entende até a versão ${VERSAO_BACKUP}. Atualize o projeto antes de restaurar.`,
    )
  }
  if (typeof p.tabelas !== 'object' || p.tabelas === null) {
    throw new Error('Arquivo de backup inválido: falta a seção "tabelas".')
  }
  for (const tabela of TABELAS_BACKUP) {
    if (!Array.isArray(p.tabelas[tabela])) {
      throw new Error(`Arquivo de backup inválido: a tabela "${tabela}" não veio no arquivo.`)
    }
  }
  if (!Array.isArray(p.arquivos)) {
    throw new Error('Arquivo de backup inválido: falta a seção "arquivos".')
  }
  return p as BackupPayload
}

/** Nome do arquivo, com data e hora, para não sobrescrever backup anterior. */
export function nomeArquivoBackup(extensao: string, quando = new Date()): string {
  const iso = quando.toISOString().replace(/\.\d+Z$/, '').replace(/[:T]/g, '-')
  return `backup-clinica-${iso}.${extensao}`
}
