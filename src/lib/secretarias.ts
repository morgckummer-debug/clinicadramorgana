export const SECRETARIAS = ['Adriana', 'Morgana', 'Yasmin']

const EMAIL_MAP: Record<string, string> = {
  Adriana: 'adriana@dramorgana.com.br',
  Morgana: 'morgckummer@gmail.com',
  Yasmin:  'yasmin@dramorgana.com.br',
}

export function nomeParaEmail(nome: string): string {
  return EMAIL_MAP[nome] ?? `${nome.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')}@secretaria.mk`
}
