/**
 * Empacota e criptografa o backup.
 *
 * O repositório é público e o artifact do GitHub Actions de um repositório
 * público é baixável por qualquer pessoa. Então o arquivo que sai daqui é o
 * único que pode circular: JSON → gzip → AES-256-GCM com senha.
 *
 * Formato do arquivo (tudo binário, nesta ordem):
 *
 *   0..7    "CDMKBK1\n"  — assinatura + versão do formato
 *   8..23   salt   (16 bytes, aleatório por arquivo)
 *   24..35  IV     (12 bytes, aleatório por arquivo)
 *   36..51  tag    (16 bytes, autenticação do GCM)
 *   52..    conteúdo cifrado (JSON do backup, comprimido com gzip)
 *
 * A chave sai da senha por scrypt, com salt novo a cada arquivo — dois backups
 * seguidos com a mesma senha não geram bytes parecidos, e uma senha decorada
 * não vira chave direto.
 */
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'node:crypto'
import { gunzipSync, gzipSync } from 'node:zlib'

export const ASSINATURA = Buffer.from('CDMKBK1\n', 'ascii')

const TAM_SALT = 16
const TAM_IV = 12
const TAM_TAG = 16
const TAM_CHAVE = 32

/** Parâmetros do scrypt. Mudar qualquer um exige subir a versão da assinatura. */
const SCRYPT = { N: 2 ** 15, r: 8, p: 1, maxmem: 128 * 1024 * 1024 }

const CABECALHO = ASSINATURA.length + TAM_SALT + TAM_IV + TAM_TAG

export class SenhaIncorretaError extends Error {
  constructor() {
    super(
      'Não foi possível abrir o backup: senha incorreta ou arquivo corrompido. ' +
        'A senha é a mesma que está no segredo BACKUP_PASSPHRASE do GitHub.',
    )
    this.name = 'SenhaIncorretaError'
  }
}

/**
 * Tamanho mínimo da senha do backup.
 *
 * O repositório é público, e artifact de repositório público é baixável por
 * qualquer pessoa. A cifra é a única barreira entre um estranho e os dados das
 * pacientes — e cifra boa com senha curta não protege nada, porque quem baixou
 * o arquivo pode tentar quantas senhas quiser, sem pressa e sem ninguém ver.
 *
 * Vinte caracteres é o piso: seis palavras aleatórias passam folgado.
 */
export const TAMANHO_MINIMO_SENHA = 20

/** Devolve o que há de errado com a senha, ou `null` se ela serve. */
export function conferirForcaDaSenha(senha: string): string | null {
  const limpa = senha.trim()
  if (limpa.length < TAMANHO_MINIMO_SENHA) {
    return `a senha tem ${limpa.length} caractere(s) e precisa de pelo menos ${TAMANHO_MINIMO_SENHA}`
  }
  if (new Set(limpa).size < 8) {
    return 'a senha repete pouquíssimos caracteres diferentes'
  }
  if (/^[0-9\s]+$/.test(limpa)) {
    return 'a senha só tem números'
  }
  return null
}

function derivarChave(senha: string, salt: Buffer): Buffer {
  if (!senha) throw new Error('Senha do backup vazia.')
  return scryptSync(senha.normalize('NFKC'), salt, TAM_CHAVE, SCRYPT)
}

/** JSON → gzip. Separado da cifra para poder testar cada metade sozinha. */
export function comprimir(payload: unknown): Buffer {
  return gzipSync(Buffer.from(JSON.stringify(payload), 'utf8'), { level: 9 })
}

export function descomprimir(dados: Buffer): unknown {
  return JSON.parse(gunzipSync(dados).toString('utf8'))
}

export function criptografar(dados: Buffer, senha: string): Buffer {
  const salt = randomBytes(TAM_SALT)
  const iv = randomBytes(TAM_IV)
  const cifra = createCipheriv('aes-256-gcm', derivarChave(senha, salt), iv)
  const corpo = Buffer.concat([cifra.update(dados), cifra.final()])
  return Buffer.concat([ASSINATURA, salt, iv, cifra.getAuthTag(), corpo])
}

export function descriptografar(arquivo: Buffer, senha: string): Buffer {
  if (arquivo.length < CABECALHO || !arquivo.subarray(0, ASSINATURA.length).equals(ASSINATURA)) {
    throw new Error(
      'Este arquivo não é um backup criptografado deste projeto (assinatura não confere).',
    )
  }
  let pos = ASSINATURA.length
  const salt = arquivo.subarray(pos, (pos += TAM_SALT))
  const iv = arquivo.subarray(pos, (pos += TAM_IV))
  const tag = arquivo.subarray(pos, (pos += TAM_TAG))
  const corpo = arquivo.subarray(pos)

  const decifra = createDecipheriv('aes-256-gcm', derivarChave(senha, salt), iv)
  decifra.setAuthTag(tag)
  try {
    return Buffer.concat([decifra.update(corpo), decifra.final()])
  } catch {
    throw new SenhaIncorretaError()
  }
}

/** true se o arquivo começa com a assinatura — usado para aceitar .json e .cdmk. */
export function pareceCriptografado(arquivo: Buffer): boolean {
  return arquivo.length >= ASSINATURA.length && arquivo.subarray(0, ASSINATURA.length).equals(ASSINATURA)
}

/** Backup pronto para gravar: JSON → gzip → cifra. */
export function empacotar(payload: unknown, senha: string): Buffer {
  return criptografar(comprimir(payload), senha)
}

/** Caminho inverso de `empacotar`. */
export function desempacotar(arquivo: Buffer, senha: string): unknown {
  return descomprimir(descriptografar(arquivo, senha))
}
