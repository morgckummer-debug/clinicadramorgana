import { describe, it, expect } from 'vitest'
import {
  FORMATO_BACKUP,
  VERSAO_BACKUP,
  montarBackup,
  nomeArquivoBackup,
  resumirBackup,
  validarBackup,
} from './formato'

const exemplo = () =>
  montarBackup({
    origem: 'painel',
    projetoUrl: 'https://exemplo.supabase.co',
    tabelas: {
      pacientes: [{ id: 'p1', nome: 'Fulana', cpf: '00000000000' }],
      pre_agendamentos: [{ id: 'a1', paciente_id: 'p1', status: 'pendente' }],
    },
    arquivos: [
      { caminho: 'a.pdf', bucket: 'pedidos', tamanho: 100, tipo: 'application/pdf', conteudo_base64: 'AAA' },
      { caminho: 'b.pdf', bucket: 'pedidos', tamanho: 200, tipo: null, conteudo_base64: null, erro: 'sumiu' },
    ],
    geradoEm: new Date('2026-08-25T12:34:56.789Z'),
  })

describe('montarBackup', () => {
  it('carimba formato, versão e data', () => {
    const p = exemplo()
    expect(p.formato).toBe(FORMATO_BACKUP)
    expect(p.versao).toBe(VERSAO_BACKUP)
    expect(p.gerado_em).toBe('2026-08-25T12:34:56.789Z')
    expect(p.aviso).toMatch(/dados pessoais/i)
  })
})

describe('resumirBackup', () => {
  it('conta linhas, arquivos e bytes sem expor dado de paciente', () => {
    const r = resumirBackup(exemplo())
    expect(r.linhas).toEqual({ pacientes: 1, pre_agendamentos: 1 })
    expect(r.arquivos).toBe(2)
    expect(r.arquivos_com_erro).toBe(1)
    expect(r.bytes_arquivos).toBe(300)
    // O resumo acompanha o backup em texto puro; nada de nome ou CPF nele.
    expect(JSON.stringify(r)).not.toMatch(/Fulana|00000000000/)
  })
})

describe('validarBackup', () => {
  it('aceita um backup íntegro', () => {
    expect(validarBackup(JSON.parse(JSON.stringify(exemplo())))).toBeTruthy()
  })

  it('recusa arquivo que não é backup deste projeto', () => {
    expect(() => validarBackup({ formato: 'outra-coisa', versao: 1 })).toThrow(/formato/i)
    expect(() => validarBackup(null)).toThrow(/inválido/i)
    expect(() => validarBackup('{}')).toThrow(/inválido/i)
  })

  it('recusa backup de uma versão futura em vez de importar pela metade', () => {
    expect(() => validarBackup({ ...exemplo(), versao: VERSAO_BACKUP + 1 })).toThrow(/versão/i)
  })

  it('recusa backup sem alguma das tabelas', () => {
    const p = exemplo() as unknown as Record<string, unknown>
    p.tabelas = { pacientes: [] }
    expect(() => validarBackup(p)).toThrow(/pre_agendamentos/)
  })

  it('recusa backup sem a seção de arquivos', () => {
    const p = exemplo() as unknown as Record<string, unknown>
    delete p.arquivos
    expect(() => validarBackup(p)).toThrow(/arquivos/)
  })
})

describe('nomeArquivoBackup', () => {
  it('leva data e hora, para uma cópia não sobrescrever a outra', () => {
    const nome = nomeArquivoBackup('cdmk', new Date('2026-08-25T12:34:56.789Z'))
    expect(nome).toBe('backup-clinica-2026-08-25-12-34-56.cdmk')
    expect(nome).not.toMatch(/[:]/)
  })
})
