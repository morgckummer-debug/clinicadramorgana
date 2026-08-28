/**
 * Backup completo do banco: tabelas + arquivos do bucket `pedidos`.
 *
 *   SUPABASE_SERVICE_ROLE_KEY=... BACKUP_PASSPHRASE=... bun run backup
 *
 * Roda todo dia pelo GitHub Actions (.github/workflows/supabase-backup.yml) e
 * também na mão, quando quiser uma cópia no seu computador.
 *
 * Sai um único arquivo `.cdmk` criptografado (veja scripts/backup/cripto.ts) e,
 * ao lado dele, um resumo em texto puro com as contagens — dá para conferir a
 * rodada sem precisar da senha.
 *
 * Restaurar: scripts/supabase-restore.ts.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  BUCKET_BACKUP,
  TABELAS_BACKUP,
  montarBackup,
  nomeArquivoBackup,
  resumirBackup,
  type ArquivoBackup,
  type LinhaBackup,
} from '../src/lib/backup/formato'
import { TAMANHO_MINIMO_SENHA, conferirForcaDaSenha, empacotar } from './backup/cripto'
import {
  URL_PADRAO,
  baixarArquivo,
  criarCliente,
  listarArquivos,
  listarLinhas,
} from './backup/supabase'

const semSenha = process.argv.includes('--sem-criptografia')

function exigir(nome: string, dica: string): string {
  const valor = process.env[nome]?.trim()
  if (!valor) {
    console.error(`\n✖ Falta a variável ${nome}.\n  ${dica}\n`)
    process.exit(1)
  }
  return valor
}

/** Tráfego de saída incluso no plano gratuito do Supabase, por mês. */
const EGRESSO_GRATUITO_GB = 5

/** A partir de quanto do teto vale a pena avisar (60%). */
const LIMIAR_AVISO = 0.6

/**
 * Avisa quando o backup diário estiver perto de estourar o tráfego do plano
 * gratuito do Supabase.
 *
 * Toda madrugada este script baixa o bucket inteiro, então o tráfego mensal é
 * o tamanho do bucket vezes trinta. Isso cresce sozinho conforme as pacientes
 * anexam pedidos, e ninguém percebe até o Supabase começar a recusar
 * requisição. O aviso vira o resumo verde do GitHub em texto vermelho antes
 * disso acontecer.
 */
function avisarSobreTrafego(bytesDosArquivos: number): void {
  const gbPorMes = (bytesDosArquivos * 30) / 1024 ** 3
  const fatia = gbPorMes / EGRESSO_GRATUITO_GB
  if (fatia < LIMIAR_AVISO) return

  console.warn(
    `\n⚠ Este backup baixa ${(bytesDosArquivos / 1024 / 1024).toFixed(0)} MB de anexos por dia, ` +
      `o que dá ~${gbPorMes.toFixed(1)} GB por mês — ${(fatia * 100).toFixed(0)}% do tráfego ` +
      `incluso no plano gratuito do Supabase (${EGRESSO_GRATUITO_GB} GB).\n` +
      '  Chegando perto do teto, o site começa a falhar para as pacientes.\n' +
      '  Saídas: baixar os anexos uma vez por semana em vez de todo dia, ou migrar para o plano pago.\n',
  )
}

async function main() {
  const url = process.env.SUPABASE_URL?.trim() || URL_PADRAO
  const chave = exigir(
    'SUPABASE_SERVICE_ROLE_KEY',
    'Pegue em Supabase Dashboard → Settings → API → service_role. É ela que enxerga as tabelas por cima do RLS.',
  )
  const senha = semSenha
    ? ''
    : exigir(
        'BACKUP_PASSPHRASE',
        'Escolha uma senha longa e guarde-a fora do GitHub. Sem ela o backup não abre. ' +
          '(Para gerar um backup sem criptografia — só faça isso no seu computador — passe --sem-criptografia.)',
      )

  // O artifact deste repositório é público: senha fraca aqui não é um descuido
  // pequeno, é a diferença entre um arquivo inútil e o prontuário das pacientes
  // na mão de quem baixar. Melhor o backup falhar alto do que sair frágil.
  if (!semSenha) {
    const problema = conferirForcaDaSenha(senha)
    if (problema) {
      console.error(
        `\n✖ A senha do backup não serve: ${problema}.\n` +
          `  Use pelo menos ${TAMANHO_MINIMO_SENHA} caracteres — seis palavras aleatórias passam folgado —\n` +
          '  e troque o valor do segredo BACKUP_PASSPHRASE no GitHub.\n',
      )
      process.exit(1)
    }
  }

  const cliente = criarCliente(url, chave)
  if (!cliente.privilegiada) {
    console.error(
      '\n✖ A chave informada não é a service_role.\n' +
        '  Com a chave anon o RLS esconde as tabelas e o backup sairia vazio.\n',
    )
    process.exit(1)
  }

  console.log(`● Projeto: ${cliente.url}`)

  const tabelas: Record<string, LinhaBackup[]> = {}
  for (const tabela of TABELAS_BACKUP) {
    tabelas[tabela] = await listarLinhas(cliente, tabela)
    console.log(`● ${tabela}: ${tabelas[tabela].length} linha(s)`)
  }

  const listagem = await listarArquivos(cliente, BUCKET_BACKUP)
  console.log(`● ${BUCKET_BACKUP}: ${listagem.length} arquivo(s)`)

  const arquivos: ArquivoBackup[] = []
  for (const item of listagem) {
    try {
      const bytes = await baixarArquivo(cliente, BUCKET_BACKUP, item.caminho)
      arquivos.push({
        caminho: item.caminho,
        bucket: BUCKET_BACKUP,
        tamanho: bytes.byteLength,
        tipo: item.tipo,
        conteudo_base64: bytes.toString('base64'),
      })
    } catch (e) {
      // Um pedido médico ilegível não pode derrubar o backup das 400 pacientes:
      // registra a falha dentro do próprio arquivo e segue.
      console.warn(`  ! ${item.caminho}: ${(e as Error).message}`)
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

  const payload = montarBackup({
    origem: process.env.GITHUB_ACTIONS ? 'github-actions' : 'script-local',
    projetoUrl: cliente.url,
    tabelas,
    arquivos,
  })
  const resumo = resumirBackup(payload)

  const pasta = process.env.BACKUP_DIR?.trim() || 'backup-saida'
  mkdirSync(pasta, { recursive: true })

  const nome = nomeArquivoBackup(semSenha ? 'json' : 'cdmk')
  const conteudo = semSenha
    ? Buffer.from(JSON.stringify(payload), 'utf8')
    : empacotar(payload, senha)
  writeFileSync(join(pasta, nome), conteudo)

  const linhasResumo = Object.entries(resumo.linhas).map(([t, n]) => `  ${t}: ${n}`).join('\n')
  writeFileSync(
    join(pasta, nome.replace(/\.(cdmk|json)$/, '-resumo.txt')),
    [
      'Resumo do backup (sem nenhum dado de paciente)',
      '',
      `arquivo:       ${nome}`,
      `gerado em:     ${resumo.gerado_em}`,
      `origem:        ${resumo.origem}`,
      `projeto:       ${resumo.projeto_url}`,
      `criptografado: ${semSenha ? 'NÃO' : 'sim (AES-256-GCM)'}`,
      '',
      'linhas:',
      linhasResumo,
      '',
      `arquivos do bucket: ${resumo.arquivos} (${(resumo.bytes_arquivos / 1024 / 1024).toFixed(2)} MB)`,
      `arquivos com erro:  ${resumo.arquivos_com_erro}`,
      '',
    ].join('\n'),
  )

  const mb = (conteudo.byteLength / 1024 / 1024).toFixed(2)
  console.log(`✔ ${join(pasta, nome)} (${mb} MB)`)
  avisarSobreTrafego(resumo.bytes_arquivos)
  if (semSenha) console.warn('⚠ Backup SEM criptografia — não suba este arquivo em lugar nenhum.')
  if (resumo.arquivos_com_erro > 0) {
    console.warn(`⚠ ${resumo.arquivos_com_erro} arquivo(s) do bucket não puderam ser baixados.`)
  }
}

main().catch((e) => {
  console.error(`\n✖ ${(e as Error).message}\n`)
  process.exit(1)
})
