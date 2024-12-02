import pkg, { type User } from '@prisma/client'

const { PrismaClient } = pkg
const prisma = new PrismaClient()
export default prisma

export function formatUser(user: User) {
  return {
    id: user.id,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    bio: user.bio,
    avatar: user.avatar,
    cover: user.cover,
    isVerified: user.isVerified,
    authToken: user.authToken,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    stripeCustomerId: user.stripeCustomerId,
  }
}
