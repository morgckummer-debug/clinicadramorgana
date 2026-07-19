import type { ReactNode } from 'react'
import { PageShell } from '@/components/common/PageShell'
import { CLINICA, WHATSAPP_URL } from '@/lib/contato'

const ATUALIZADO_EM = '19 de julho de 2026'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="font-comfortaa text-wine-deep text-lg font-medium mb-3">{title}</h2>
      <div className="text-sm text-foreground/80 font-light leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  )
}

export default function PoliticaPrivacidade() {
  return (
    <PageShell backTo="/">
      <div className="mb-10 text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-wine font-semibold mb-2">
          {CLINICA.nome}
        </p>
        <h1 className="font-comfortaa text-wine-deep text-[clamp(1.6rem,5vw,2.2rem)] font-light leading-[1.2] mb-2">
          Política de Privacidade
        </h1>
        <p className="text-foreground/60 font-light text-sm">
          Última atualização em {ATUALIZADO_EM}
        </p>
      </div>

      <Section title="1. Quem trata os seus dados">
        <p>
          Esta política se aplica ao site e aos formulários de agendamento da {CLINICA.nome}
          {' '}({CLINICA.site}), responsável pelo tratamento dos dados pessoais coletados aqui,
          nos termos da Lei nº 13.709/2018 (Lei Geral de Proteção de Dados — LGPD).
        </p>
      </Section>

      <Section title="2. Quais dados coletamos">
        <p>Ao usar o pré-agendamento ou o portal do paciente, podemos coletar:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Dados de identificação: nome completo, CPF e data de nascimento;</li>
          <li>Dados de contato: telefone/WhatsApp;</li>
          <li>Dados de saúde: exame desejado, pedido médico, resultado de beta-hCG, data da última
            menstruação e demais informações clínicas necessárias ao agendamento, quando fornecidas
            por você ou pelo seu médico;</li>
          <li>Arquivos enviados: fotos ou PDFs de pedidos médicos e exames anteriores;</li>
          <li>Convênio ou forma de pagamento informada.</li>
        </ul>
        <p>
          Dados de saúde são considerados <strong>dados pessoais sensíveis</strong> pela LGPD
          (Art. 5º, II) e recebem cuidado adicional no seu tratamento.
        </p>
      </Section>

      <Section title="3. Para que usamos seus dados">
        <ul className="list-disc pl-5 space-y-1">
          <li>Agendar, realizar e acompanhar o seu exame;</li>
          <li>Entrar em contato para confirmar, remarcar ou orientar sobre o atendimento;</li>
          <li>Identificar seu cadastro e evitar duplicidade de registros;</li>
          <li>Cumprir obrigações legais e regulatórias aplicáveis a serviços de saúde.</li>
        </ul>
        <p>Não utilizamos seus dados para envio de publicidade de terceiros.</p>
      </Section>

      <Section title="4. Base legal">
        <p>Tratamos seus dados com base em:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Tutela da saúde</strong> (Art. 11, II, "f" da LGPD), para os dados de saúde
            necessários ao seu atendimento, conduzido por profissionais de saúde;
          </li>
          <li>
            <strong>Execução de procedimentos preliminares ao contrato</strong> (Art. 7º, V), para
            viabilizar o agendamento do exame;
          </li>
          <li>
            <strong>Consentimento</strong> (Art. 7º, I e Art. 11, I), coletado especificamente no
            formulário de pré-agendamento, para o tratamento descrito nesta política. Esse
            consentimento é independente de qualquer termo de responsabilidade assinado
            presencialmente na clínica, e pode ser revogado a qualquer momento pelos canais
            informados na seção 8, sem prejuízo dos atendimentos já realizados.
          </li>
        </ul>
      </Section>

      <Section title="5. Com quem compartilhamos os dados">
        <p>
          Seus dados são armazenados em infraestrutura da Supabase (operadora de banco de dados
          e autenticação), que trata as informações apenas seguindo as nossas instruções, com
          controle de acesso restrito à equipe autorizada da clínica.
        </p>
        <p>
          Quando você informa um convênio, os dados necessários podem ser compartilhados com essa
          operadora exclusivamente para fins de autorização do exame. Não vendemos nem
          compartilhamos seus dados para fins de marketing de terceiros.
        </p>
      </Section>

      <Section title="6. Por quanto tempo guardamos seus dados">
        <p>
          Prontuários e registros de exames são mantidos pelo prazo mínimo exigido pelo Conselho
          Federal de Medicina (atualmente 20 anos), independentemente de eventual revogação do
          consentimento, por se tratar de obrigação legal. Dados de contato usados apenas para
          agendamentos não concretizados podem ser removidos mediante solicitação, conforme a
          seção 7.
        </p>
      </Section>

      <Section title="7. Seus direitos">
        <p>Como titular dos dados, você pode solicitar, a qualquer momento:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Confirmação de que tratamos seus dados e acesso a eles;</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desacordo com a LGPD;</li>
          <li>Portabilidade dos dados a outro fornecedor de serviço;</li>
          <li>Revogação do consentimento dado no pré-agendamento;</li>
          <li>Informação sobre com quem compartilhamos seus dados.</li>
        </ul>
        <p>
          Pedidos de exclusão ou anonimização não se aplicam a registros que a clínica é
          legalmente obrigada a manter (ex.: prontuário médico).
        </p>
      </Section>

      <Section title="8. Segurança">
        <p>
          Adotamos medidas técnicas e administrativas para proteger seus dados contra acessos não
          autorizados e situações acidentais ou ilícitas de destruição, perda, alteração ou
          comunicação, incluindo controle de acesso por login individual da equipe e conexões
          criptografadas entre o site e o banco de dados.
        </p>
      </Section>

      <Section title="9. Contato e encarregado (DPO)">
        <p>
          Para exercer seus direitos, tirar dúvidas sobre esta política ou relatar uma
          preocupação relacionada aos seus dados, fale com a nossa equipe:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>WhatsApp: <a href={WHATSAPP_URL} target="whatsapp" className="text-wine-deep underline underline-offset-2">{CLINICA.telefone}</a></li>
          <li>Endereço: Rua Cândido Azeredo, 41 A — Centro, Sete Lagoas / MG, CEP 35700-019</li>
        </ul>
      </Section>

      <Section title="10. Alterações desta política">
        <p>
          Esta política pode ser atualizada para refletir melhorias em nossos processos ou
          mudanças na legislação. A data no topo desta página indica a versão vigente.
        </p>
      </Section>
    </PageShell>
  )
}
