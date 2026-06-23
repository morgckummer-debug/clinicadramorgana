import { toPng } from 'html-to-image'

export async function renderPosterToPng(
  node: HTMLElement,
  filename: string,
): Promise<void> {
  const dataUrl = await toPng(node, {
    pixelRatio: 1,
    cacheBust: true,
    backgroundColor: '#faf6f2',
    width: 1080,
    height: node.offsetHeight,
  })

  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
