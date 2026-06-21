// Para adicionar uma secretária: só colocar o nome aqui.
// O email interno é gerado automaticamente: nome@secretaria.mk
export const SECRETARIAS = ['Adriana', 'Morgana']

export function nomeParaEmail(nome: string): string {
  return `${nome.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')}@secretaria.mk`
}
