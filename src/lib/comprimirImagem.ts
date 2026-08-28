/**
 * Encolhe a foto do anexo antes de subir para o Supabase.
 *
 * A paciente fotografa o pedido médico com o celular e o arquivo sai com 12
 * megapixels e uns 2 MB. Para ler uma receita isso é umas sete vezes mais
 * resolução do que precisa, e o preço é cobrado três vezes: no 1 GB de
 * armazenamento do plano gratuito, no tráfego que o backup diário consome
 * baixando tudo de novo toda madrugada, e na paciente esperando o upload
 * terminar no 4G.
 *
 * Regra de ouro deste arquivo: **em qualquer imprevisto, devolver o arquivo
 * original**. Comprimir é otimização; anexar é o que a paciente veio fazer.
 * Nenhuma falha aqui pode impedir um pré-agendamento de ser concluído.
 */

/** Maior lado da imagem depois de encolher. */
export const LADO_MAXIMO = 2000

/** Qualidade do JPEG. Acima disso o arquivo cresce sem o texto ficar melhor. */
export const QUALIDADE_JPEG = 0.85

/** Só mexemos nestes tipos. PDF e qualquer outra coisa passam intactos. */
const TIPOS_COMPRIMIVEIS = ['image/jpeg', 'image/png']

export function ehImagemComprimivel(file: File): boolean {
  return TIPOS_COMPRIMIVEIS.includes(file.type)
}

/**
 * Dimensões finais, mantendo a proporção.
 *
 * Imagem que já é menor que o limite não é ampliada: esticar não acrescenta
 * informação nenhuma e ainda engorda o arquivo.
 */
export function calcularDimensoes(
  largura: number,
  altura: number,
  ladoMaximo = LADO_MAXIMO,
): { largura: number; altura: number } {
  const maior = Math.max(largura, altura)
  if (maior <= ladoMaximo || maior === 0) return { largura, altura }
  const fator = ladoMaximo / maior
  return {
    largura: Math.max(1, Math.round(largura * fator)),
    altura: Math.max(1, Math.round(altura * fator)),
  }
}

/** Troca a extensão do nome por .jpg, já que a saída é sempre JPEG. */
export function nomeComoJpg(nome: string): string {
  const base = nome.replace(/\.[^./\\]+$/, '')
  return `${base || 'anexo'}.jpg`
}

interface Fonte {
  desenhavel: CanvasImageSource
  largura: number
  altura: number
  liberar: () => void
}

/**
 * Decodifica o arquivo respeitando a orientação da câmera.
 *
 * Foto de celular vem com a orientação gravada no EXIF em vez de nos pixels.
 * Ignorar isso entrega o pedido médico deitado para a secretária — que é pior
 * do que o arquivo grande que a gente veio resolver. `createImageBitmap` com
 * `imageOrientation: 'from-image'` aplica o EXIF; onde ele não existir ou
 * recusar as opções, o `<img>` faz o mesmo por padrão nos navegadores atuais.
 */
async function carregarFonte(file: File): Promise<Fonte> {
  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
      return {
        desenhavel: bitmap,
        largura: bitmap.width,
        altura: bitmap.height,
        liberar: () => bitmap.close(),
      }
    } catch {
      // Navegador antigo, ou sem suporte à opção de orientação: usa o <img>.
    }
  }

  const url = URL.createObjectURL(file)
  try {
    const img = new Image()
    img.src = url
    await img.decode()
    return {
      desenhavel: img,
      largura: img.naturalWidth,
      altura: img.naturalHeight,
      liberar: () => URL.revokeObjectURL(url),
    }
  } catch (e) {
    URL.revokeObjectURL(url)
    throw e
  }
}

function paraBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', QUALIDADE_JPEG))
}

/**
 * Devolve uma versão menor do arquivo, ou o próprio arquivo se não valer a
 * pena mexer (não é imagem, deu erro, ou o resultado ficou maior).
 */
export async function comprimirImagem(file: File): Promise<File> {
  if (!ehImagemComprimivel(file)) return file

  let fonte: Fonte | null = null
  try {
    fonte = await carregarFonte(file)
    const { largura, altura } = calcularDimensoes(fonte.largura, fonte.altura)

    const canvas = document.createElement('canvas')
    canvas.width = largura
    canvas.height = altura
    const ctx = canvas.getContext('2d')
    if (!ctx) return file

    // Fundo branco: PNG com transparência viraria preto no JPEG, e um pedido
    // médico com fundo preto é ilegível.
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, largura, altura)
    ctx.drawImage(fonte.desenhavel, 0, 0, largura, altura)

    const blob = await paraBlob(canvas)
    // Imagem pequena ou já otimizada pode crescer ao ser reprocessada.
    if (!blob || blob.size >= file.size) return file

    return new File([blob], nomeComoJpg(file.name), {
      type: 'image/jpeg',
      lastModified: file.lastModified,
    })
  } catch (e) {
    console.warn('Não foi possível comprimir o anexo; enviando o original.', e)
    return file
  } finally {
    fonte?.liberar()
  }
}
