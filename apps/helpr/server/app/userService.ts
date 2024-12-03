import bcrypt from 'bcrypt'
import { H3Event } from 'h3'
import jwt from 'jsonwebtoken'
import prisma, { formatUser } from '~~/server/database/client'
import type { createUserInput, updateUserInput } from '~~/server/api/user/user.dto'
import resetPassword from '~~/server/api/mailer/templates/reset-password'
import { sendGmail } from '~~/server/app/mailerService'
import { generateEmailVerificationToken } from '~~/server/app/authService'
import { Role } from '~~/enums/Role'
import type { User } from '~~/types/User'

export async function createUser(userData: createUserInput) {
  const foundUser = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: userData.username,
        },
        {
          email: userData.email,
        },
      ],
    },
  })
  if (foundUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User already exists',
    })
  }
  const password = await bcrypt.hash(userData.password, 10)
  const user = await prisma.user.create({
    data: {
      ...userData,
      password,
    },
  })
  const token = await generateEmailVerificationToken(user.id)
  const { appDomain } = useRuntimeConfig().public
  const url = `${appDomain}/verify/user?token=${token}`
  await sendGmail({
    template: resetPassword(user.email, url),
    to: user.email,
    from: useRuntimeConfig().mailerUser,
    subject: 'Verify your email',
  })
  return formatUser(user)
}

export async function getUserById(userId: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
  if (!user) throw createError({ statusCode: 404, message: 'User not found' })
  return formatUser(user)
}

export async function getUserByLogin(login: string) {
  return await prisma.user.findFirst({
    where: {
      OR: [{ email: login }, { username: login }],
    },
  })
}

export async function getAllUsers() {
  const users = await prisma.user.findMany()
  return users.map((user) => {
    return formatUser(user)
  })
}

export async function getUserByAuthToken(authToken: string): Promise<User | null> {
  const user = await prisma.user.findFirst({
    where: {
      authToken,
    },
  })
  if (!user) return null
  return formatUser(user)
}

export async function setAuthToken(userId: number) {
  const user = await getUserById(userId)
  const authToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
      username: user.username,
      email: user.email,
    },
    useRuntimeConfig().private.authSecret,
    { expiresIn: '7d' },
  )
  const refreshToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
      username: user.username,
      email: user.email,
    },
    useRuntimeConfig().private.refreshTokenSecret,
    { expiresIn: '30d' },
  )
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      authToken,
      refreshToken,
    },
  })
}

export async function adminCheck(event: H3Event): Promise<boolean> {
  const authToken = getCookie(event, 'authToken')
  if (!authToken) return false
  const user = await getUserByAuthToken(authToken)
  if (!user) return false
  return user.role === Role.ADMIN
}

export async function deleteUser(userId: number) {
  return await prisma.user.delete({
    where: {
      id: userId,
    },
  })
}

export async function updateUser(userId: number, updateUserInput: updateUserInput) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      ...updateUserInput,
    },
  })
  return formatUser(user)
}
