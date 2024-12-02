import Crypto from 'crypto-js'

export function encrypt(toEncrypt: string) {
  const secretKey = useRuntimeConfig().private.encryptionKey
  return Crypto.AES.encrypt(toEncrypt, secretKey).toString()
}

export function decrypt(toDecrypt: string) {
  const secretKey = useRuntimeConfig().private.encryptionKey
  return Crypto.AES.decrypt(toDecrypt, secretKey).toString(Crypto.enc.Utf8)
}
