/**
 * Batida diária no banco, para o Supabase não pausar o projeto.
 *
 *   bun run keepalive
 *
 * No plano gratuito, um projeto sem atividade de BANCO por cerca de uma semana
 * é pausado. Enquanto pausado, o site e o painel param de funcionar e o projeto
 * entra na fila dos que podem ser descartados — e o plano gratuito não guarda
 * backup nenhum. Uma escrita por dia mantém o projeto vivo.
 *
 * Roda sozinho em .github/workflows/supabase-keepalive.yml.
 *
 * Funciona sem nenhum segredo configurado (usa a chave anon, que já é pública
 * no bundle do site). Se a service_role estiver disponível, usa ela.
 */
import { ANON_PADRAO, URL_PADRAO, criarCliente, rpc } from './backup/supabase'

async function main() {
  const url = process.env.SUPABASE_URL?.trim() || URL_PADRAO
  const chave =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_ANON_KEY?.trim() ||
    ANON_PADRAO

  const cliente = criarCliente(url, chave)
  const origem = process.env.GITHUB_ACTIONS ? 'github-actions' : 'manual'

  try {
    const quando = await rpc(cliente, 'registrar_keepalive', { p_origem: origem })
    console.log(`✔ ${cliente.url} respondeu — batida registrada em ${String(quando)}`)
    return
  } catch (e) {
    const msg = (e as Error).message
    // Projeto pausado / fora do ar: falha alto, para o GitHub mandar o e-mail.
    if ((e as Error).name === 'ProjetoIndisponivelError') throw e
    // Banco no ar, mas sem a função: a migration 20260825_keepalive.sql ainda
    // não foi aplicada. Cai numa leitura real, que também conta como atividade.
    console.warn(`⚠ registrar_keepalive() indisponível (${msg}).`)
    console.warn('  Aplique supabase/migrations/20260825_keepalive.sql no SQL Editor.')
  }

  await rpc(cliente, 'verificar_bloqueio_cpf', { p_cpf: '00000000000' })
  console.log(`✔ ${cliente.url} respondeu — atividade registrada pela consulta de reserva.`)
}

main().catch((e) => {
  console.error(`\n✖ ${(e as Error).message}\n`)
  process.exit(1)
})
