import Stripe from 'stripe'
import { handleSubscriptionChange } from '~~/server/app/stripeService'

export default defineEventHandler(async (event) => {
  const stripeEvent = await readBody<Stripe.Event>(event)

  const subscription = stripeEvent.data.object as Stripe.Subscription

  const isSubscriptionEvent = stripeEvent.type.startsWith('customer.subscription')

  if (isSubscriptionEvent) {
    await handleSubscriptionChange(subscription, stripeEvent.created)
    return `handled ${stripeEvent.type}.`
  }
  return createError({ statusCode: 400, statusMessage: 'Invalid event type' })
})
