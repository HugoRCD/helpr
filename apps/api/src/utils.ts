import * as process from 'process'
import { User } from '@prisma/client'
import { AES, enc } from 'crypto-js'

export const formatUser = (user: User): User => {
  delete user.password
  delete user.refreshToken
  return user
}

export const generateCode = async (): Promise<string> => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

export function encrypt(toEncrypt) {
  const secretKey = process.env.NUXT_PRIVATE_AUTH_SECRET
  return AES.encrypt(toEncrypt, secretKey).toString()
}

export function decrypt(toDecrypt) {
  const secretKey = process.env.NUXT_PRIVATE_AUTH_SECRET
  const bytes = AES.decrypt(toDecrypt, secretKey)
  return bytes.toString(enc.Utf8)
}
