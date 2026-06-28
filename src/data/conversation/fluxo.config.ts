// ============================================================
//  CONFIGURAÇÃO DO FLUXO DE PRÉ-AGENDAMENTO
//  Edite aqui sem precisar mexer em mais nada.
// ============================================================

// ------------------------------------------------------------
//  TELA DE BOAS-VINDAS
// ------------------------------------------------------------
export const BOAS_VINDAS = {
  // Tempo exibido abaixo do botão "Começar"
  tempoEstimado: '2 a 4 minutos',
}

// ------------------------------------------------------------
//  LISTA DE EXAMES POR CATEGORIA
//  Aparece na pergunta "Qual exame especificamente?"
// ------------------------------------------------------------
export const EXAMES_POR_CATEGORIA: Record<string, string[]> = {
  gestacao: [
    'Obstétrico do 1º Trimestre',
    'Obstétrico - Sexo Fetal',
    '3D Completo',
    'Obstétrico com Translucência Nucal',
    'Obstétrico com Doppler',
    'Morfológico do 1º Trimestre',
    'Morfológico do 2º Trimestre',
    'Morfológico do 3º Trimestre',
    'Perfil Biofísico Fetal (PBF)',
    'Ecocardiograma Fetal',
    'Medida do Colo Uterino (Cervicometria)',
    'Cerclagem do Colo Uterino',
  ],
  ginecologico: [
    'Transvaginal (Endovaginal)',
    'Transvaginal 3D',
    'Transvaginal com Doppler',
    'Rastreamento de Ovulação',
    'Mapeamento de Endometriose Profunda',
    'Ultrassom Perineal',
  ],
  abdome: [
    'Abdome Total',
    'Abdome Superior',
    'Hipocôndrio Direito',
    'Partes Moles',
    'Rins e Vias Urinárias',
    'Pélvico Masculino (Próstata)',
  ],
  mama: [
    'Mamas e Axilas',
  ],
  vascular: [
    'Duplex Scan dos Membros Inferiores',
    'Carótidas e Vertebrais',
    'Aorta e Ilíacas',
  ],
  tireoide: [
    'Tireóide com Doppler',
    'Cervical com Doppler',
    'Glândulas Salivares',
  ],
  pediatrico: [
    'Abdominal Total (Pediátrico)',
    'Rins e Vias Urinárias (Pediátrico)',
    'Pélvico Infantil',
    'Partes Moles',
    'Transfontanela',
  ],
}

// ------------------------------------------------------------
//  MÉDICOS DA CLÍNICA
//  Aparece na pergunta "Tem preferência por algum médico?"
// ------------------------------------------------------------
export const MEDICOS = [
  { label: 'Dra. Morgana Kummer',    value: 'dra-morgana' },
  { label: 'Dra. Bárbara Rodrigues', value: 'dra-barbara' },
  { label: 'Dr. Darlei Carneiro',    value: 'dr-darlei' },
  { label: 'Dr. Paulo Gontijo Jr.',  value: 'dr-paulo' },
  { label: 'Dra. Carolina Martins',  value: 'dra-carolina' },
  { label: 'Dra. Maria Amélia',      value: 'dra-maria-amelia' },
  { label: 'Dr. André Mourão',       value: 'dr-andre' },
  { label: 'Sem preferência',        value: 'sem-preferencia' },
]

// ------------------------------------------------------------
//  CONVÊNIOS
//  Aparece na pergunta "Você possui convênio?"
// ------------------------------------------------------------
export const CONVENIOS = [
  { label: 'PARTICULAR',               value: 'particular' },
  { label: 'AGEBRAS',                  value: 'agebras' },
  { label: 'Aurora Saúde',             value: 'aurora' },
  { label: 'Casembrapa',               value: 'casembrapa' },
  { label: 'Cemig Saúde',              value: 'cemig' },
  { label: 'COPASS Saúde',             value: 'copass' },
  { label: 'Fundaffemg',               value: 'fundaffemg' },
  { label: 'FUSEX',                    value: 'fusex' },
  { label: 'Grupo ZELO',               value: 'zelo' },
  { label: 'Hapvida',                  value: 'hapvida' },
  { label: 'MedGold Saúde',            value: 'medgold' },
  { label: 'NotreDame Intermédica',    value: 'notredame' },
  { label: 'Pax de Minas',             value: 'pax-minas' },
  { label: 'Projeto Bom Pastor',       value: 'bom-pastor' },
  { label: 'Projeto Evangelize',       value: 'evangelize' },
  { label: 'Santa Clara Assistencial', value: 'santa-clara' },
  { label: 'Stellantis Saúde',         value: 'stellantis' },
]

// ------------------------------------------------------------
//  PERGUNTAS DO FLUXO
//  Edite título, subtítulo, placeholder e opções de cada etapa.
//  NÃO altere os campos "id", "type", "mask" e "next" —
//  eles controlam a lógica interna do assistente.
// ------------------------------------------------------------
export const PERGUNTAS = {

  // ETAPA 1 — Tipo de ultrassom
  q1: {
    title: 'Qual ultrassom você deseja marcar?',
    subtitle: 'Selecione a opção que melhor descreve o que você precisa.',
    options: [
      { label: 'Gestação',           value: 'gestacao' },
      { label: 'Ginecológico',       value: 'ginecologico' },
      { label: 'Abdome',             value: 'abdome' },
      { label: 'Mamas e Axilas',     value: 'mama' },
      { label: 'Vascular',           value: 'vascular' },
      { label: 'Tireoide / Cervical', value: 'tireoide' },
      { label: 'Pediátrico',         value: 'pediatrico' },
    ],
  },

  // ETAPA 2 — Exame específico (opções preenchidas automaticamente pela categoria escolhida)
  q2: {
    title: 'Qual exame especificamente?',
    subtitle: 'Se tiver pedido médico, pode conferir o nome lá.',
  },

  // ── FLUXO EXCLUSIVO: Obstétrico do 1º Trimestre ────────────────────────────

  // OB1 – Sabe a DUM?
  ob1_a: {
    title: 'Você sabe a data do primeiro dia da sua última menstruação (DUM)?',
    subtitle: '',
    options: [
      { label: 'Sim', value: 'sim' },
      { label: 'Não', value: 'nao' },
    ],
  },

  // OB1 – Informe a DUM
  ob1_b: {
    title: 'Informe a data da sua última menstruação (DUM).',
    placeholder: 'DD/MM/AAAA',
  },

  // OB1 – Tem pedido médico?
  ob1_c: {
    title: 'Você possui pedido médico para este exame?',
    subtitle: '',
    options: [
      { label: 'Sim', value: 'sim' },
      { label: 'Não', value: 'nao' },
    ],
  },

  // OB1 – Upload do pedido médico (opcional)
  ob1_d: {
    title: 'Anexe uma foto do pedido médico.',
    subtitle: 'Foto ou PDF — pode ser pelo celular mesmo.',
  },

  // OB1 – Tem resultado de beta-hCG positivo?
  ob1_e: {
    title: 'Você possui um exame de beta-hCG positivo?',
    subtitle: '',
    options: [
      { label: 'Sim', value: 'sim' },
      { label: 'Não', value: 'nao' },
    ],
  },

  // OB1 – Upload do beta-hCG (opcional)
  ob1_g: {
    title: 'Anexe uma foto do resultado do beta-hCG.',
    subtitle: 'Foto ou PDF — pode ser pelo celular mesmo.',
  },

  // OB1 – Tem ultrassom anterior desta gestação?
  ob1_f: {
    title: 'Você possui algum ultrassom desta gestação?',
    subtitle: '',
    options: [
      { label: 'Sim', value: 'sim' },
      { label: 'Não', value: 'nao' },
    ],
  },

  // OB1 – Upload do ultrassom anterior (opcional)
  ob1_h: {
    title: 'Anexe o ultrassom anterior.',
    subtitle: 'Foto ou PDF — pode ser pelo celular mesmo.',
  },

  // ── FIM DO FLUXO EXCLUSIVO ──────────────────────────────────────────────────

  // ETAPA 2b — Sabe a DUM? (só aparece para gestação e rastreamento de ovulação)
  q2b: {
    title: 'Você sabe a data da sua última menstruação (DUM)?',
    subtitle: 'Isso nos ajuda a calcular as datas ideais para o seu exame.',
    options: [
      { label: 'Sim, sei a DUM',         value: 'sim' },
      { label: 'Não sei / não lembro',   value: 'nao' },
    ],
  },

  // ETAPA 2b_us — Tem ultrassom anterior? (quando não sabe DUM — gestação não ob1)
  q2b_us: {
    title: 'Você tem um ultrassom anterior desta gestação?',
    subtitle: 'Estamos falando do primeiro exame em que apareceu o embrião com batimentos cardíacos.',
    options: [
      { label: 'Sim, tenho', value: 'sim' },
      { label: 'Não tenho', value: 'nao' },
    ],
  },

  // ETAPA 2b_us_data — Data do ultrassom anterior
  q2b_us_data: {
    title: 'Qual a data desse ultrassom?',
    subtitle: 'Informe a data do primeiro ultrassom em que apareceu o embrião com batimentos cardíacos.',
    placeholder: 'DD/MM/AAAA',
  },

  // ETAPA 2b_us_sem — Semanas mostradas no ultrassom anterior
  q2b_us_sem: {
    title: 'Quantas semanas mostrou esse ultrassom?',
    subtitle: 'Se o laudo informou semanas e dias, escreva assim: 12+3',
    placeholder: 'Ex: 12 ou 12+3',
  },

  // ETAPA 2c — Qual a DUM? (só aparece se respondeu "sim" na 2b)
  q2c: {
    title: 'Qual foi a data da sua última menstruação?',
    placeholder: 'DD/MM/AAAA',
  },

  // ETAPA 2d — Tem pedido médico? (quando NÃO sabe a DUM, para gestação)
  q2d: {
    title: 'Você tem o pedido médico em mãos?',
    subtitle: 'Pode ser foto ou PDF.',
    options: [
      { label: 'Sim, tenho o pedido',  value: 'sim' },
      { label: 'Não tenho o pedido',   value: 'nao' },
    ],
  },

  // ETAPA 2e — Tem pedido médico? (quando sabe a DUM, para gestação)
  q2e: {
    title: 'Você tem o pedido médico?',
    subtitle: 'Pode ser foto ou PDF.',
    options: [
      { label: 'Sim, tenho.',  value: 'sim' },
      { label: 'Não tenho.',   value: 'nao' },
    ],
  },

  // ETAPA 2f — Upload do pedido médico
  q2f: {
    title: 'Ótimo! Anexe o pedido médico aqui.',
    subtitle: 'Foto ou PDF — pode ser pelo celular mesmo.',
  },

  // ETAPA 2g — Upload do beta-HCG
  q2g: {
    title: 'Ótimo! Anexe o resultado do beta-HCG aqui.',
    subtitle: 'Foto ou PDF — pode ser pelo celular mesmo.',
  },

  // ETAPA 2h — Tem resultado de beta-HCG? (aparece quando não tem pedido médico para gestação)
  q2h: {
    title: 'Você tem o resultado do exame de beta-HCG?',
    subtitle: 'Precisamos do pedido médico ou do beta-HCG para agendar corretamente.',
    options: [
      { label: 'Sim, tenho.',  value: 'sim' },
      { label: 'Não tenho.',   value: 'nao' },
    ],
  },

  // ETAPA 3 — Nome completo
  q3: {
    title: 'Qual o seu nome completo?',
    placeholder: 'Nome completo',
  },

  // ETAPA 4 — CPF
  q4: {
    title: 'Qual o seu CPF?',
    subtitle: 'Usado para identificar seu cadastro e evitar duplicidades.',
    placeholder: '000.000.000-00',
  },

  // ETAPA 5 — Data de nascimento
  q5: {
    title: 'Qual a sua data de nascimento?',
    placeholder: 'DD/MM/AAAA',
  },

  // ETAPA 6 — Telefone
  q6: {
    title: 'Qual o melhor número para contato?',
    subtitle: 'Nossa equipe entrará em contato por WhatsApp neste número.',
    placeholder: '(31) 99999-9999',
  },

  // ETAPA 7 — Convênio (opções definidas em CONVENIOS acima)
  q7: {
    title: 'Você possui convênio ou parceria conosco?',
    subtitle: 'Selecione seu convênio.',
  },

  // ETAPA 8 — Turno preferido
  q8: {
    title: 'Qual turno você prefere?',
    options: [
      { label: 'Manhã',          value: 'manha' },
      { label: 'Tarde',          value: 'tarde' },
      { label: 'Sem preferência', value: 'indiferente' },
    ],
  },

  // ETAPA 9 — Médico preferido (opções definidas em MEDICOS acima)
  q9: {
    title: 'Tem preferência por algum médico?',
  },

  // ETAPA 10 — Upload do pedido médico (obrigatório)
  q10: {
    title: 'Anexe o pedido médico.',
    subtitle: 'Foto ou PDF — pode ser pelo celular mesmo.',
  },

  // ETAPA 11 — Observações livres (opcional)
  q11: {
    title: 'Alguma observação para nossa equipe?',
    subtitle: 'Opcional. Dificuldade de locomoção, urgência, dúvidas — qualquer informação que ajude.',
    placeholder: 'Ex: tenho dificuldade de locomoção, prefiro horário matutino…',
  },
}
