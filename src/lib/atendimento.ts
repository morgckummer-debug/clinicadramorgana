export type Janela = { inicio: string; fim: string } // 'HH:MM'

export const HORARIO_ATENDIMENTO = {
  diasUteis: [1, 2, 3, 4, 5],
  janelas: [
    { inicio: '08:00', fim: '11:00' },
    { inicio: '12:30', fim: '17:30' },
  ] as Janela[],
  timezone: 'America/Sao_Paulo',
}

export type StatusAtendimento = 'disponivel' | 'fora_horario' | 'desconhecido'

// Stub — futuramente avaliará a hora atual contra HORARIO_ATENDIMENTO.
export function getStatusAtendimento(): StatusAtendimento {
  return 'desconhecido'
}
