import { H3Event } from 'h3'
import jwt from 'jsonwebtoken'
import prisma, { formatUser } from '~~/server/database/client'
import type { createUserInput, updateUserInput } from '~~/server/api/user/user.dto'
import resetPassword from '~~/server/api/mailer/templates/reset-password'
import { sendGmail } from '~~/server/app/mailerService'
import { generateEmailVerificationToken } from '~~/server/app/authService'
import { Role } from '~~/enums/Role'
import type { User } from '~~/types/User'
import { Plans } from '~~/types/Pricing'
import type { Subscription } from '~~/types/Subscription'
import { createStripeCustomer } from '~~/server/app/stripeService'

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
  const stripeInfo = await createStripeCustomer(userData)
  const user = await prisma.user.create({
    data: {
      ...userData,
      stripeCustomerId: stripeInfo.stripeCustomerId,
    },
    include: {
      subscription: true,
    },
  })
  const token = await generateEmailVerificationToken(user.id)
  const { appUrl } = useRuntimeConfig().public
  const url = `${appUrl}/verify/user?token=${token}`
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
    include: {
      subscription: true,
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
    include: {
      subscription: true,
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
    include: {
      subscription: true,
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
    useRuntimeConfig().private.refreshSecret,
    { expiresIn: '30d' },
  )
  return await prisma.user.update({
    where: {
      id: userId,
    },
    include: {
      subscription: true,
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
  console.log(updateUserInput)
  const user = await prisma.user.update({
    where: { id: userId },
    data: updateUserInput
  })
  return formatUser(user)
}

export function updateStripeCustomerId(data: User): Promise<User> {
  return prisma.user.update({
    where: { email: data.email },
    data: {
      stripeCustomerId: data.stripeCustomerId,
    },
  })
}

export async function getUserByStripeCustomerId(stripeCustomerId: string) {
  const user = await prisma.user.findFirst({
    where: {
      stripeCustomerId: stripeCustomerId,
    },
    include: {
      subscription: true,
    },
  })
  if (!user) throw createError({ statusCode: 404, message: 'User not found' })
  return formatUser(user)
}

export async function getCurrentSubscription(userId: number): Promise<Subscription | null> {
  const user = await getUserById(userId)
  return await prisma.subscription.findFirst({
    where: {
      userId: user.id,
    },
  })
}

export function getSubscriptionById(stripeId: string) {
  return prisma.subscription.findFirst({
    where: {
      stripeId: stripeId,
    },
  })
}

function deleteSubscription(stripeId: string) {
  return prisma.subscription.delete({
    where: {
      stripeId: stripeId,
    },
  })
}

export async function createOrUpdateSubscription(data: Subscription) {
  const subName = data.stripePriceId === Plans.PREMIUM.priceId ? 'Premium' : ''
  if (data.stripeStatus === 'canceled') {
    await deleteSubscription(data.stripeId)
  }
  return prisma.subscription.upsert({
    where: {
      stripeId: data.stripeId,
    },
    create: {
      userId: data.userId,
      name: subName,
      stripeId: data.stripeId,
      stripeStatus: data.stripeStatus,
      stripePriceId: data.stripePriceId,
      trialEndsAt: data.trialEndsAt,
      endsAt: data.endsAt,
      lastEventDate: data.lastEventDate,
      startDate: data.startDate,
    },
    update: {
      name: subName,
      stripeStatus: data.stripeStatus,
      stripePriceId: data.stripePriceId,
      trialEndsAt: data.trialEndsAt,
      endsAt: data.endsAt,
      lastEventDate: data.lastEventDate,
      startDate: data.startDate,
    },
  })
}
