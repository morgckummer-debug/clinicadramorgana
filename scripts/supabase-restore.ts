/**
 * Devolve um backup para dentro de um projeto Supabase.
 *
 *   # 1. confere o que tem no arquivo, sem escrever nada
 *   BACKUP_PASSPHRASE=... bun run restore backup-saida/backup-clinica-....cdmk
 *
 *   # 2. restaura de verdade
 *   SUPABASE_URL=https://xxxx.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=... \
 *   BACKUP_PASSPHRASE=... \
 *   bun run restore backup-saida/backup-clinica-....cdmk --confirmar
 *
 * Antes de restaurar, rode `supabase/bootstrap.sql` no projeto de destino: ele
 * cria as tabelas, o RLS, as funções e o bucket. Este script só recoloca os
 * dados.
 *
 * As linhas voltam com o `id` original (upsert pela chave primária), então
 * rodar duas vezes não duplica nada e os pré-agendamentos continuam apontando
 * para as pacientes certas.
 */
import { readFileSync } from 'node:fs'
import {
  BUCKET_BACKUP,
  TABELAS_BACKUP,
  resumirBackup,
  validarBackup,
} from '../src/lib/backup/formato'
import { desempacotar, pareceCriptografado } from './backup/cripto'
import { URL_PADRAO, criarCliente, enviarArquivo, gravarLinhas } from './backup/supabase'

function lerPayload(caminho: string): unknown {
  const bruto = readFileSync(caminho)
  if (!pareceCriptografado(bruto)) return JSON.parse(bruto.toString('utf8'))

  const senha = process.env.BACKUP_PASSPHRASE?.trim()
  if (!senha) {
    console.error(
      '\n✖ Este backup está criptografado e falta a variável BACKUP_PASSPHRASE.\n' +
        '  É a mesma senha do segredo BACKUP_PASSPHRASE no GitHub.\n',
    )
    process.exit(1)
  }
  return desempacotar(bruto, senha)
}

async function main() {
  const argumentos = process.argv.slice(2)
  const caminho = argumentos.find((a) => !a.startsWith('--'))
  const confirmar = argumentos.includes('--confirmar')

  if (!caminho) {
    console.error('\nUso: bun run restore <arquivo-de-backup> [--confirmar]\n')
    process.exit(1)
  }

  const payload = validarBackup(lerPayload(caminho))
  const resumo = resumirBackup(payload)

  console.log(`● Backup de ${resumo.gerado_em} (origem: ${resumo.origem})`)
  console.log(`● Saiu de: ${resumo.projeto_url}`)
  for (const [tabela, n] of Object.entries(resumo.linhas)) console.log(`● ${tabela}: ${n} linha(s)`)
  console.log(`● arquivos: ${resumo.arquivos} (${(resumo.bytes_arquivos / 1024 / 1024).toFixed(2)} MB)`)
  if (resumo.arquivos_com_erro > 0) {
    console.warn(`⚠ ${resumo.arquivos_com_erro} arquivo(s) foram salvos sem conteúdo e não voltarão.`)
  }

  if (!confirmar) {
    console.log('\nNada foi escrito. Rode de novo com --confirmar para restaurar.\n')
    return
  }

  const url = process.env.SUPABASE_URL?.trim() || URL_PADRAO
  const chave = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!chave) {
    console.error(
      '\n✖ Falta SUPABASE_SERVICE_ROLE_KEY (do projeto de DESTINO).\n' +
        '  Supabase Dashboard → Settings → API → service_role.\n',
    )
    process.exit(1)
  }

  const cliente = criarCliente(url, chave)
  if (!cliente.privilegiada) {
    console.error('\n✖ A chave informada não é a service_role — o RLS bloquearia a escrita.\n')
    process.exit(1)
  }

  console.log(`\n● Restaurando em ${cliente.url}`)

  // Pacientes antes de pré-agendamentos: a chave estrangeira exige a paciente
  // existindo. TABELAS_BACKUP já está nessa ordem.
  for (const tabela of TABELAS_BACKUP) {
    const linhas = payload.tabelas[tabela] ?? []
    if (linhas.length === 0) {
      console.log(`● ${tabela}: nada a restaurar`)
      continue
    }
    const n = await gravarLinhas(cliente, tabela, linhas)
    console.log(`✔ ${tabela}: ${n} linha(s)`)
  }

  let enviados = 0
  const falhas: string[] = []
  for (const arquivo of payload.arquivos) {
    if (arquivo.conteudo_base64 === null) continue
    try {
      await enviarArquivo(cliente, arquivo.bucket || BUCKET_BACKUP, arquivo)
      enviados++
    } catch (e) {
      falhas.push(`${arquivo.caminho}: ${(e as Error).message}`)
    }
  }
  console.log(`✔ arquivos: ${enviados} enviado(s)`)
  for (const falha of falhas) console.warn(`  ! ${falha}`)

  console.log(
    '\n✔ Restauração concluída.\n' +
      '  Falta ainda recriar os logins em Authentication → Users (as senhas não\n' +
      '  saem no backup, por segurança) e apontar VITE_SUPABASE_URL /\n' +
      '  VITE_SUPABASE_ANON_KEY para o projeto novo.\n',
  )
}

main().catch((e) => {
  console.error(`\n✖ ${(e as Error).message}\n`)
  process.exit(1)
})
