import { describe, it, expect } from 'vitest'
import { criarCliente, ehServiceRole } from './supabase'

/** Monta um JWT de mentira com o papel pedido — só o miolo importa aqui. */
function jwt(role: string): string {
  return `cabecalho.${Buffer.from(JSON.stringify({ role })).toString('base64url')}.assinatura`
}

describe('ehServiceRole', () => {
  it('reconhece o formato novo pelo prefixo', () => {
    expect(ehServiceRole('sb_secret_PNmCu11Hdy5YDOFDn2sedA')).toBe(true)
    expect(ehServiceRole('sb_publishable_PNmCu11Hdy5YDOFDn2sedA')).toBe(false)
  })

  it('reconhece o JWT antigo pelo papel declarado dentro dele', () => {
    expect(ehServiceRole(jwt('service_role'))).toBe(true)
    expect(ehServiceRole(jwt('anon'))).toBe(false)
    expect(ehServiceRole(jwt('authenticated'))).toBe(false)
  })

  it('ignora espaço colado junto na hora de copiar', () => {
    expect(ehServiceRole('  sb_secret_abc  ')).toBe(true)
    expect(ehServiceRole(` ${jwt('service_role')}\n`)).toBe(true)
  })

  it('trata como não privilegiada qualquer coisa que não dê para ler', () => {
    expect(ehServiceRole('')).toBe(false)
    expect(ehServiceRole('chave-qualquer')).toBe(false)
    expect(ehServiceRole('a.b.c')).toBe(false)
  })
})

describe('criarCliente', () => {
  it('tira a barra do fim e os espaços da URL', () => {
    expect(criarCliente(' https://x.supabase.co// ', 'k').url).toBe('https://x.supabase.co')
  })

  it('recusa URL sem https em vez de falhar só na hora da chamada', () => {
    expect(() => criarCliente('http://x.supabase.co', 'k')).toThrow(/inválida/i)
    expect(() => criarCliente('x.supabase.co', 'k')).toThrow(/inválida/i)
  })
})
