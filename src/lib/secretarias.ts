const SECRETARIAS_MAP: { nome: string; email: string }[] = [
  { nome: 'Adriana', email: 'adriana@dramorgana.com.br' },
  { nome: 'Morgana', email: 'morgckummer@gmail.com' },
  { nome: 'Yasmin',  email: 'yasmin@dramorgana.com.br' },
]

export const SECRETARIAS = SECRETARIAS_MAP.map((s) => s.nome)

export function nomeParaEmail(nome: string): string {
  return SECRETARIAS_MAP.find((s) => s.nome === nome)?.email ?? ''
}
