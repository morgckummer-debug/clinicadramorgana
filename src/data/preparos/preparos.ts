import type { IconKey } from './icons'

export type InfoBlockData = {
  icon: IconKey
  title: string
  items: string[]
}

export type PreparoGroup = {
  id: string
  nome: string
  blocos: InfoBlockData[]
  observacoes?: string[]
  /** Quando true, renderiza apenas a mensagem acolhedora e oferece WhatsApp no lugar de "Salvar preparo". */
  semPreparoEspecifico?: boolean
}

export const PREPAROS: PreparoGroup[] = [
  {
    id: 'abdome-superior',
    nome: 'Abdome Superior',
    blocos: [
      {
        icon: 'jejum',
        title: 'Jejum',
        items: ['Fazer jejum de pelo menos 6 horas.'],
      },
      {
        icon: 'alimentacao',
        title: 'No dia do exame',
        items: ['Não comer nem beber nada.', 'Nem café.'],
      },
      {
        icon: 'bexiga',
        title: 'Bexiga',
        items: ['Não é necessário encher a bexiga.'],
      },
    ],
  },
  {
    id: 'abdome-total-manha',
    nome: 'Abdome Total — Manhã',
    blocos: [
      {
        icon: 'jejum',
        title: 'Jejum',
        items: ['Fazer jejum de 8 a 12 horas.'],
      },
      {
        icon: 'alimentacao',
        title: 'Alimentação',
        items: [
          'Na noite anterior, fazer refeição leve.',
          'Evitar refrigerantes, álcool, leite e derivados e alimentos gordurosos.',
        ],
      },
      {
        icon: 'medicamento',
        title: 'Medicamento',
        items: ['Tomar 01 comprimido (125mg) ou 40 gotas (75mg/ml) de Dimeticona ou Simeticona (antigases) de 6 em 6 horas, durante todo o dia anterior ao exame.'],
      },
      {
        icon: 'agua',
        title: 'Água',
        items: ['Beber 4 copos de água 2 horas antes do exame.'],
      },
      {
        icon: 'bexiga',
        title: 'Bexiga',
        items: ['Não urinar após beber a água.'],
      },
      {
        icon: 'sonda',
        title: 'Sonda vesical',
        items: ['Caso utilize sonda vesical, mantê-la fechada por 1 hora.'],
      },
    ],
  },
  {
    id: 'abdome-total-tarde',
    nome: 'Abdome Total — Tarde',
    blocos: [
      {
        icon: 'jejum',
        title: 'Jejum',
        items: ['Fazer jejum de pelo menos 6 horas.'],
      },
      {
        icon: 'alimentacao',
        title: 'Alimentação',
        items: ['No dia anterior, manter alimentação leve.'],
      },
      {
        icon: 'medicamento',
        title: 'Medicamento — dia anterior',
        items: ['Tomar 01 comprimido (125mg) ou 40 gotas (75mg/ml) de Dimeticona ou Simeticona (antigases) de 6 em 6 horas, durante todo o dia anterior ao exame.'],
      },
      {
        icon: 'alimentacao',
        title: 'No dia do exame',
        items: ['Fazer apenas refeições leves.'],
      },
      {
        icon: 'medicamento',
        title: 'Medicamento — dia do exame',
        items: ['Tomar novamente 01 comprimido (125mg) ou 40 gotas (75mg/ml) de Dimeticona ou Simeticona pela manhã e após a última refeição.'],
      },
      {
        icon: 'agua',
        title: 'Água',
        items: ['Beber 4 copos de água 2 horas antes do exame.'],
      },
      {
        icon: 'bexiga',
        title: 'Bexiga',
        items: ['Não urinar após beber a água.'],
      },
      {
        icon: 'sonda',
        title: 'Sonda vesical',
        items: ['Caso utilize sonda vesical, mantê-la fechada por 1 hora.'],
      },
    ],
  },
  {
    id: 'obstetrico',
    nome: 'Obstétrico',
    blocos: [
      {
        icon: 'alimentacao',
        title: 'Alimentação',
        items: ['Não venha em jejum.'],
      },
      {
        icon: 'agua',
        title: 'Hidratação',
        items: ['Beber bastante líquido no dia anterior.'],
      },
      {
        icon: 'cuidados',
        title: 'Cuidados com a pele',
        items: ['Não utilizar óleos ou cremes na barriga nas últimas 48 horas.'],
      },
      {
        icon: 'documentos',
        title: 'O que trazer',
        items: ['Cartão de pré-natal.', 'Ultrassons anteriores.'],
      },
      {
        icon: 'horario',
        title: 'Chegada',
        items: ['Chegar com antecedência.'],
      },
    ],
    observacoes: [
      'O exame pode demorar mais que o previsto, dependendo da posição do bebê.',
    ],
  },
  {
    id: 'pesquisa-endometriose',
    nome: 'Pesquisa de Endometriose',
    blocos: [
      {
        icon: 'alimentacao',
        title: 'Dia anterior ao exame',
        items: [
          'Dieta leve. Evite feijão, lentilha, grão de bico e outros alimentos que sabidamente podem determinar gases em você.',
          'Tomar 5 (cinco) envelopes de macrogol 3350 (Munvilax®) diluídos em 600 ml de água às 8 horas.',
          'Tomar 5 (cinco) envelopes de macrogol 3350 (Munvilax®) diluídos em 600 ml de água às 14 horas.',
          'Hidrate-se bem durante o dia.',
        ],
      },
      {
        icon: 'observacao',
        title: 'Caso não encontre a medicação recomendada',
        items: [
          'Entre em contato com a clínica para orientações.',
        ],
      },
      {
        icon: 'jejum',
        title: 'Dia do exame',
        items: [
          'Jejum de, no mínimo, 4 horas (água não entra no jejum).',
          'Hidrate-se bem antes do exame.',
          '1 (um) frasco de Phosefoenema pela via retal 1 hora antes do exame (seguir as orientações da bula).',
          'Esvaziar a bexiga 30 minutos antes do exame e, em seguida, tomar 2 (dois) copos de água (400 ml).',
        ],
      },
      {
        icon: 'cuidados',
        title: 'Medicações alternativas',
        items: [
          'Caso você não encontre o Munvilax® para tomar na véspera do exame: Bisacodil - 5 mg (Dulcolax®). Tomar 2 (dois) comprimidos, às 08 horas e 2 (dois) comprimidos às 14 horas.',
        ],
      },
    ],
    observacoes: [
      'OBS.: REALIZAR TODO O PREPARO EM CASA.',
    ],
  },
  {
    id: 'pelve-bexiga',
    nome: 'Pelve e Bexiga',
    blocos: [
      {
        icon: 'agua',
        title: 'Água',
        items: ['Beber 3 copos de água 1 hora antes do exame.'],
      },
      {
        icon: 'bexiga',
        title: 'Bexiga',
        items: ['Não urinar até a realização do exame, salvo orientação médica.'],
      },
      {
        icon: 'jejum',
        title: 'Jejum',
        items: ['Não é necessário jejum.'],
      },
      {
        icon: 'sonda',
        title: 'Sonda vesical',
        items: ['Caso utilize sonda vesical, mantê-la fechada por 1 hora antes do exame.'],
      },
    ],
  },
  {
    id: 'sem-preparo',
    nome: 'Sem preparo especial',
    blocos: [],
    semPreparoEspecifico: true,
  },
]

export const getPreparo = (id: string): PreparoGroup | undefined =>
  PREPAROS.find((p) => p.id === id)
