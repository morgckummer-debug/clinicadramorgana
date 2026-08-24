import { describe, it, expect } from 'vitest'
import { podeFinalizar, temAnexo, EXAMES_SEM_PEDIDO_OBRIGATORIO } from './pedidoMedico'

describe('podeFinalizar', () => {
  it('deixa concluir o Obstétrico do 1º Trimestre sem nenhum anexo', () => {
    // O fluxo ob1_* declara os uploads como opcionais; a trava final não pode
    // barrar quem os pulou depois de já ter informado que possui o pedido.
    expect(podeFinalizar('Obstétrico do 1º Trimestre', {})).toBe(true)
  })

  it('deixa concluir o 1º Trimestre com beta-hCG anexado', () => {
    expect(podeFinalizar('Obstétrico do 1º Trimestre', { ob1_g: ['url'] })).toBe(true)
  })

  it('deixa concluir os exames que dispensam prescrição', () => {
    expect(podeFinalizar('Obstétrico - Sexo Fetal', {})).toBe(true)
    expect(podeFinalizar('3D Completo', {})).toBe(true)
  })

  it('barra exame que exige prescrição quando nada foi anexado', () => {
    expect(podeFinalizar('Morfológico do 2º Trimestre', {})).toBe(false)
    expect(podeFinalizar('Morfológico do 2º Trimestre', { q10: [] })).toBe(false)
    expect(podeFinalizar('Morfológico do 2º Trimestre', { q10: '' })).toBe(false)
  })

  it('libera exame que exige prescrição quando há anexo', () => {
    expect(podeFinalizar('Morfológico do 2º Trimestre', { q10: ['url'] })).toBe(true)
    expect(podeFinalizar('Morfológico do 2º Trimestre', { q2f: 'url' })).toBe(true)
  })

  it('aceita o ultrassom anterior como anexo válido', () => {
    // ob1_h é enviado ao backend junto dos demais; ignorá-lo aqui bloquearia
    // quem anexou só o ultrassom anterior.
    expect(podeFinalizar('Morfológico do 2º Trimestre', { ob1_h: ['url'] })).toBe(true)
  })

  it('trata exame ausente como exigindo anexo', () => {
    expect(podeFinalizar(undefined, {})).toBe(false)
    expect(podeFinalizar(undefined, { q10: ['url'] })).toBe(true)
  })
})

describe('temAnexo', () => {
  it('ignora valores vazios', () => {
    expect(temAnexo({})).toBe(false)
    expect(temAnexo({ q10: [], q2f: '', ob1_d: undefined })).toBe(false)
  })

  it('encontra anexo em qualquer um dos campos', () => {
    for (const campo of ['q10', 'q2f', 'ob1_d', 'ob1_g', 'ob1_h']) {
      expect(temAnexo({ [campo]: ['url'] })).toBe(true)
    }
  })
})

describe('EXAMES_SEM_PEDIDO_OBRIGATORIO', () => {
  it('inclui o Obstétrico do 1º Trimestre', () => {
    expect(EXAMES_SEM_PEDIDO_OBRIGATORIO.has('Obstétrico do 1º Trimestre')).toBe(true)
  })
})
