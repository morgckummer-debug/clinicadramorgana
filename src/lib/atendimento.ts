export type Janela = { inicio: string; fim: string } // 'HHhMM'

export const HORARIO_ATENDIMENTO = {
  diasUteis: [1, 2, 3, 4, 5],
  janelas: [
    { inicio: '08h00', fim: '11h00' },
    { inicio: '12h30', fim: '17h30' },
  ] as Janela[],
  timezone: 'America/Sao_Paulo',
}

export type StatusAtendimento = 'disponivel' | 'fora_horario' | 'desconhecido'

// Stub — futuramente avaliará a hora atual contra HORARIO_ATENDIMENTO.
export function getStatusAtendimento(): StatusAtendimento {
  return 'desconhecido'
}
