import { getUserById, updateStripeCustomerId } from '~~/server/app/userService'
import { getSubscribeUrl } from '~~/server/app/stripeService'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { priceId } = body
  const { userId } = body

  const user = await getUserById(+userId)

  const { url, user: customer, shouldUpdateUser } = await getSubscribeUrl(priceId, user)

  if (shouldUpdateUser)
    await updateStripeCustomerId(customer)

  await sendRedirect(event, url)
})
