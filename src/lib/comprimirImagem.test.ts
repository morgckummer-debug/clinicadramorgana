import { describe, it, expect } from 'vitest'
import {
  LADO_MAXIMO,
  calcularDimensoes,
  comprimirImagem,
  ehImagemComprimivel,
  nomeComoJpg,
} from './comprimirImagem'

const arquivo = (nome: string, tipo: string, bytes = 1000) =>
  new File([new Uint8Array(bytes)], nome, { type: tipo })

describe('ehImagemComprimivel', () => {
  it('mexe em foto, não mexe em PDF', () => {
    expect(ehImagemComprimivel(arquivo('pedido.jpg', 'image/jpeg'))).toBe(true)
    expect(ehImagemComprimivel(arquivo('print.png', 'image/png'))).toBe(true)
    expect(ehImagemComprimivel(arquivo('pedido.pdf', 'application/pdf'))).toBe(false)
    expect(ehImagemComprimivel(arquivo('sem-tipo', ''))).toBe(false)
  })
})

describe('calcularDimensoes', () => {
  it('encolhe pelo maior lado, mantendo a proporção', () => {
    // Foto de celular deitada, 12 MP.
    expect(calcularDimensoes(4000, 3000)).toEqual({ largura: 2000, altura: 1500 })
    // Em pé, que é como a paciente costuma fotografar a receita.
    expect(calcularDimensoes(3000, 4000)).toEqual({ largura: 1500, altura: 2000 })
  })

  it('não amplia imagem que já é pequena', () => {
    // Esticar não acrescenta informação e ainda engorda o arquivo.
    expect(calcularDimensoes(800, 600)).toEqual({ largura: 800, altura: 600 })
    expect(calcularDimensoes(LADO_MAXIMO, 100)).toEqual({ largura: LADO_MAXIMO, altura: 100 })
  })

  it('não devolve lado zero num recorte muito estreito', () => {
    const { largura, altura } = calcularDimensoes(10000, 3)
    expect(largura).toBe(LADO_MAXIMO)
    expect(altura).toBeGreaterThanOrEqual(1)
  })

  it('aguenta dimensão zerada sem dividir por zero', () => {
    expect(calcularDimensoes(0, 0)).toEqual({ largura: 0, altura: 0 })
  })
})

describe('nomeComoJpg', () => {
  it('troca a extensão, já que a saída é sempre JPEG', () => {
    expect(nomeComoJpg('pedido.png')).toBe('pedido.jpg')
    expect(nomeComoJpg('IMG_0042.HEIC')).toBe('IMG_0042.jpg')
    expect(nomeComoJpg('receita da dra. ana.jpeg')).toBe('receita da dra. ana.jpg')
    expect(nomeComoJpg('sem-extensao')).toBe('sem-extensao.jpg')
  })
})

describe('comprimirImagem', () => {
  it('devolve o PDF intacto', async () => {
    const pdf = arquivo('pedido.pdf', 'application/pdf')
    expect(await comprimirImagem(pdf)).toBe(pdf)
  })

  it('devolve o original quando o navegador não consegue processar a imagem', async () => {
    // Este é o comportamento que protege a paciente: aqui no jsdom não há
    // canvas, então a compressão falha — e o anexo tem de seguir assim mesmo.
    const foto = arquivo('pedido.jpg', 'image/jpeg')
    expect(await comprimirImagem(foto)).toBe(foto)
  })
})
