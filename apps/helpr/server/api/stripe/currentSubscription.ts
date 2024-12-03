import type { Subscription } from '@prisma/client'
import { getCurrentSubscription } from '~~/server/app/userService'

export default defineEventHandler(async (event): Promise<Subscription | null> => {
  const body = await readBody(event)
  return await getCurrentSubscription(+body.userId)
})
