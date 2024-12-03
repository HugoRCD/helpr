import Stripe from 'stripe'
import type { Subscription, User } from '@prisma/client'
import { createOrUpdateSubscription, getSubscriptionById, getUserByStripeCustomerId } from '~~/server/app/userService'
import type { createUserInput } from '~~/server/api/user/user.dto'
import prisma from '~~/server/database/client'

const config = useRuntimeConfig()
const stripe = new Stripe(config.private.stripeSecretKey, {
  apiVersion: '2024-11-20.acacia',
})

export async function createStripeCustomer(userData: createUserInput) {
  const customer = await stripe.customers.create({
    email: userData.email,
    name: `${userData.username}`
  })
  return {
    stripeCustomerId: customer.id,
  }
}

export async function deleteStripeCustomer(stripeCustomerId: string) {
  await stripe.customers.del(stripeCustomerId)
}

export async function getSubscribeUrl(priceId: string, user: User) {
  const customerEmail = user.email

  const price = await stripe.prices.retrieve(priceId)

  let shouldUpdateUser = false

  if (!user.stripeCustomerId) {
    shouldUpdateUser = true
    const customer = await stripe.customers.create({
      email: customerEmail,
    })
    user.stripeCustomerId = customer.id
  }

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    allow_promotion_codes: true,
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${config.public.appUrl}/app/edit-profile?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.public.appUrl}`,
    customer: user.stripeCustomerId,
  })

  return { url: session.url as string, user, shouldUpdateUser }
}

export async function handleSubscriptionChange(
  subscription: Stripe.Subscription,
  lastEventDate: number,
): Promise<boolean> {
  const localSubscription = (await getSubscriptionById(subscription.id)) as Subscription

  if (localSubscription?.lastEventDate > lastEventDate) {
    return true
  }

  if (subscription.status === 'canceled') {
    await prisma.subscription.delete({
      where: {
        stripeId: subscription.id,
      },
    })
    return true
  }

  const stripeCustomerId = subscription.customer as string

  const user = await getUserByStripeCustomerId(stripeCustomerId)
  const data = {
    userId: user.id,
    name: subscription.id,
    stripeId: subscription.id,
    stripeStatus: subscription.status,
    stripePriceId: subscription.items.data[0].price.id,
    quantity: subscription.description,
    trialEndsAt: subscription.trial_end,
    endsAt: subscription.ended_at,
    startDate: subscription.start_date,
    lastEventDate: lastEventDate,
  } as unknown as Subscription

  await createOrUpdateSubscription(data)

  return true
}
