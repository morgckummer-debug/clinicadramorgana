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
  {
    id: 'abdome-total',
    nome: 'Abdome Total',
    variants: [
      { id: 'manha', label: 'Manhã', icon: 'manha', preparoId: 'abdome-total-manha' },
      { id: 'tarde', label: 'Tarde', icon: 'tarde', preparoId: 'abdome-total-tarde' },
    ],
  },
  { id: 'abdome-superior', nome: 'Abdome Superior', preparoId: 'abdome-superior' },
  { id: 'rins', nome: 'Rins e Vias Urinárias', preparoId: 'pelve-bexiga' },
  { id: 'pelvico-feminino', nome: 'Pélvico Feminino', preparoId: 'pelve-bexiga' },
  { id: 'pelvico-masculino', nome: 'Pélvico Masculino', preparoId: 'pelve-bexiga' },
  { id: 'obstetrico', nome: 'Obstétrico', preparoId: 'obstetrico' },
  { id: 'morfologico', nome: 'Morfológico', preparoId: 'obstetrico' },
  { id: 'doppler-obstetrico', nome: 'Doppler Obstétrico', preparoId: 'obstetrico' },
  { id: 'transvaginal', nome: 'Transvaginal', preparoId: 'sem-preparo' },
  { id: 'mamas', nome: 'Mamas', preparoId: 'sem-preparo' },
  { id: 'tireoide', nome: 'Tireoide', preparoId: 'sem-preparo' },
  { id: 'prostata', nome: 'Próstata', preparoId: 'pelve-bexiga' },
  { id: 'endometriose-profunda', nome: 'Mapeamento de Endometriose Profunda', preparoId: 'pesquisa-endometriose' },
]

export const getExam = (id: string): Exam | undefined =>
  EXAMS.find((e) => e.id === id)
