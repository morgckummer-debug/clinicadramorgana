import { describe, it, expect } from 'vitest'
import {
  ASSINATURA,
  criptografar,
  descriptografar,
  desempacotar,
  empacotar,
  pareceCriptografado,
} from './cripto'

const SENHA = 'senha-longa-de-teste-do-backup'

describe('cripto do backup', () => {
  it('empacota e desempacota o mesmo conteúdo', () => {
    const payload = { tabelas: { pacientes: [{ id: 'p1', nome: 'Fulana' }] }, arquivos: [] }
    expect(desempacotar(empacotar(payload, SENHA), SENHA)).toEqual(payload)
  })

  it('não deixa o conteúdo aparecer em claro no arquivo', () => {
    const arquivo = empacotar({ nome: 'Fulana de Tal', cpf: '12345678901' }, SENHA)
    const texto = arquivo.toString('latin1')
    expect(texto).not.toContain('Fulana')
    expect(texto).not.toContain('12345678901')
  })

  it('recusa a senha errada em vez de devolver lixo', () => {
    const arquivo = empacotar({ a: 1 }, SENHA)
    expect(() => desempacotar(arquivo, 'senha-errada')).toThrow(/senha incorreta/i)
  })

  it('recusa arquivo adulterado', () => {
    const arquivo = empacotar({ a: 1 }, SENHA)
    arquivo[arquivo.length - 1] ^= 0xff
    expect(() => desempacotar(arquivo, SENHA)).toThrow(/senha incorreta|corrompido/i)
  })

  it('recusa arquivo que não é backup deste projeto', () => {
    expect(() => descriptografar(Buffer.from('qualquer coisa'), SENHA)).toThrow(/assinatura/i)
  })

  it('gera bytes diferentes a cada rodada, com a mesma senha e o mesmo dado', () => {
    // Salt e IV novos por arquivo: dois backups seguidos não podem sair iguais.
    const a = criptografar(Buffer.from('mesmo conteúdo'), SENHA)
    const b = criptografar(Buffer.from('mesmo conteúdo'), SENHA)
    expect(a.equals(b)).toBe(false)
    expect(descriptografar(a, SENHA).toString()).toBe('mesmo conteúdo')
    expect(descriptografar(b, SENHA).toString()).toBe('mesmo conteúdo')
  })

  it('reconhece pela assinatura o que é backup criptografado e o que é JSON puro', () => {
    expect(pareceCriptografado(empacotar({ a: 1 }, SENHA))).toBe(true)
    expect(pareceCriptografado(Buffer.from('{"formato":"..."}'))).toBe(false)
    expect(ASSINATURA.toString('ascii')).toBe('CDMKBK1\n')
  })
})
