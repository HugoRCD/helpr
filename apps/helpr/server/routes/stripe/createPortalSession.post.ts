import Stripe from 'stripe'

const config = useRuntimeConfig()
const stripe = new Stripe(config.private.stripeSecretKey, {
  apiVersion: '2024-11-20.acacia',
})

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const { stripeCustomerId } = body
  const returnUrl = useRuntimeConfig().public.appUrl
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: returnUrl + '/app/edit-profile',
  })
  await sendRedirect(event, portalSession.url)
})
