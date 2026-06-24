import type { IconKey } from './icons'

export type ExamVariant = {
  id: string
  label: string
  icon: IconKey
  preparoId: string
}

export type Exam =
  | { id: string; nome: string; preparoId: string; variants?: never }
  | { id: string; nome: string; variants: ExamVariant[]; preparoId?: never }

export const EXAMS: Exam[] = [
  { id: 'abdome-superior', nome: 'Abdome Superior', preparoId: 'abdome-superior' },
  {
    id: 'abdome-total',
    nome: 'Abdome Total',
    variants: [
      { id: 'manha', label: 'Manhã', icon: 'manha', preparoId: 'abdome-total-manha' },
      { id: 'tarde', label: 'Tarde', icon: 'tarde', preparoId: 'abdome-total-tarde' },
    ],
  },
  { id: 'endometriose-profunda', nome: 'Endometriose Profunda', preparoId: 'pesquisa-endometriose' },
  { id: 'mamas', nome: 'Mamas', preparoId: 'sem-preparo' },
  { id: 'obstetrico', nome: 'Obstétrico', preparoId: 'obstetrico' },
  { id: 'pelvico-feminino', nome: 'Pélvico Feminino', preparoId: 'pelve-bexiga' },
  { id: 'pelvico-masculino', nome: 'Pélvico Masculino\n(Próstata)', preparoId: 'pelve-bexiga' },
  { id: 'rins', nome: 'Rins e Vias Urinárias', preparoId: 'pelve-bexiga' },
  { id: 'tireoide', nome: 'Tireoide', preparoId: 'sem-preparo' },
  { id: 'transvaginal', nome: 'Transvaginal', preparoId: 'sem-preparo' },
]

export const getExam = (id: string): Exam | undefined =>
  EXAMS.find((e) => e.id === id)
