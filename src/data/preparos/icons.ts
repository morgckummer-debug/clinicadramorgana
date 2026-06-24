import {
  Utensils,
  Droplets,
  Toilet,
  Pill,
  Baby,
  FileText,
  Clock,
  AlertTriangle,
  Salad,
  HeartPulse,
  Sparkles,
  Sun,
  Moon,
  type LucideIcon,
} from 'lucide-react'

export type IconKey =
  | 'jejum'
  | 'agua'
  | 'bexiga'
  | 'medicamento'
  | 'gestacao'
  | 'documentos'
  | 'horario'
  | 'observacao'
  | 'alimentacao'
  | 'sonda'
  | 'cuidados'
  | 'manha'
  | 'tarde'

export const ICONS: Record<IconKey, LucideIcon> = {
  jejum: Utensils,
  agua: Droplets,
  bexiga: Toilet,
  medicamento: Pill,
  gestacao: Baby,
  documentos: FileText,
  horario: Clock,
  observacao: AlertTriangle,
  alimentacao: Salad,
  sonda: HeartPulse,
  cuidados: Sparkles,
  manha: Sun,
  tarde: Moon,
}

export const getIcon = (key: IconKey): LucideIcon => ICONS[key]
