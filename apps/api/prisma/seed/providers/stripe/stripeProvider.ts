import { prisma } from '../../../seed'
import {
  createCustomerAction,
  createPaymentAction,
  createPaymentLinkAction,
  createProductAction,
} from './stripeActions'
import {
  customerCreatedTrigger,
  paymentCreatedTrigger,
  productCreatedTrigger,
} from './stripeTriggers'

export async function createStripeProvider() {
  const provider = await prisma.provider.create({
    data: {
      name: 'Stripe',
      description:
        'Stripe is a suite of payment APIs that powers commerce for online businesses. You can create customers, products and payments.',
      logo: 'stripe-logo',
      tokenLink: 'https://dashboard.stripe.com/apikeys',
    },
  })
  // Actions
  await createCustomerAction(provider.id)
  await createPaymentAction(provider.id)
  await createProductAction(provider.id)
  await createPaymentLinkAction(provider.id)
  // Triggers
  await customerCreatedTrigger(provider.id)
  await paymentCreatedTrigger(provider.id)
  await productCreatedTrigger(provider.id)
}
