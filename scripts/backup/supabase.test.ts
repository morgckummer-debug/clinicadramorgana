import { describe, it, expect } from 'vitest'
import { criarCliente, ehServiceRole, refDaChave, refDoProjeto } from './supabase'

/** Monta um JWT de mentira — só o miolo importa aqui. */
function jwt(role: string, ref?: string): string {
  const corpo = ref === undefined ? { role } : { role, ref }
  return `cabecalho.${Buffer.from(JSON.stringify(corpo)).toString('base64url')}.assinatura`
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

describe('conferência de projeto', () => {
  it('lê o projeto da URL e o projeto declarado na chave', () => {
    expect(refDoProjeto('https://hbrjufcagpibatxhzgtc.supabase.co')).toBe('hbrjufcagpibatxhzgtc')
    expect(refDoProjeto('https://exemplo.com')).toBeNull()
    expect(refDaChave(jwt('service_role', 'hbrjufcagpibatxhzgtc'))).toBe('hbrjufcagpibatxhzgtc')
  })

  it('avisa quando a chave é de outro projeto, em vez de deixar o Supabase dizer só "Invalid API key"', () => {
    // Quem cuida de vários projetos copia a chave errada; o 401 do Supabase
    // não diz qual é o problema, e a pessoa fica trocando a chave às cegas.
    expect(() =>
      criarCliente('https://projetoa.supabase.co', jwt('service_role', 'projetob')),
    ).toThrow(/é do projeto "projetob".*apontando para o projeto "projetoa"/s)
  })

  it('deixa passar quando os dois batem', () => {
    const c = criarCliente('https://projetoa.supabase.co', jwt('service_role', 'projetoa'))
    expect(c.privilegiada).toBe(true)
  })

  it('não atrapalha a chave do formato novo, que não declara projeto', () => {
    // sb_secret_ não carrega o projeto dentro; sem informação, não há o que conferir.
    expect(refDaChave('sb_secret_abc')).toBeNull()
    expect(criarCliente('https://projetoa.supabase.co', 'sb_secret_abc').privilegiada).toBe(true)
  })
})
