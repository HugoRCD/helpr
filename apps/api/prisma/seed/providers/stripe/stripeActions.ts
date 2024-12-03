import { prisma } from '../../../seed'

export async function createCustomerAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: 'Create Customer',
      description: 'Create a Stripe customer',
      endpoint: 'stripe',
      name: 'create-customer',
      providerId: providerId,
      variables: {
        create: [
          {
            title: 'Create customer name',
            key: 'stripe_customer_name',
            value: '{stripe_customer_name}',
            required: true,
          },
          {
            title: 'Create customer email',
            key: 'stripe_customer_email',
            value: '{stripe_customer_email}',
            required: true,
          },
          {
            title: 'Create customer phone',
            key: 'stripe_customer_phone',
            value: '{stripe_customer_phone}',
            required: true,
          },
        ],
      },
    },
  })
}

export async function createPaymentAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: 'Create Payment',
      description: 'Create a Stripe payment',
      endpoint: 'stripe',
      name: 'create-payment',
      providerId: providerId,
      variables: {
        create: [
          {
            title: 'Create payment amount',
            key: 'stripe_payment_amount',
            value: '{stripe_payment_amount}',
            required: true,
          },
          {
            title: 'Create payment currency',
            key: 'stripe_payment_currency',
            value: '{stripe_payment_currency}',
            type: 'select',
            required: true,
          },
          {
            title: 'Create payment customer',
            key: 'stripe_payment_customer',
            value: '{stripe_payment_customer}',
            required: true,
          },
          {
            title: 'Create payment description',
            key: 'stripe_payment_description',
            value: '{stripe_payment_description}',
            type: 'textarea',
            required: false,
          },
        ],
      },
    },
  })
}

export async function createProductAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: 'Create Product',
      description: 'Create a Stripe product',
      endpoint: 'stripe',
      name: 'create-product',
      providerId: providerId,
      variables: {
        create: [
          {
            title: 'Create product name',
            key: 'stripe_product_name',
            value: '{stripe_product_name}',
            required: true,
          },
          {
            title: 'Create product description',
            key: 'stripe_product_description',
            value: '{stripe_product_description}',
            type: 'textarea',
            required: false,
          },
          {
            title: 'Create product price',
            key: 'stripe_product_price',
            value: '{stripe_product_price}',
            required: true,
          },
          {
            title: 'Create product currency',
            key: 'stripe_product_currency',
            value: '{stripe_product_currency}',
            type: 'select',
            required: true,
          },
        ],
      },
    },
  })
}

export async function createPaymentLinkAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: 'Create Payment Link',
      description: 'Create a Stripe payment link',
      endpoint: 'stripe',
      name: 'create-link',
      providerId: providerId,
      variables: {
        create: [
          {
            title: 'Create link price',
            key: 'stripe_link_price',
            value: '{stripe_link_price}',
            required: true,
          },
          {
            title: 'Create link quantity',
            key: 'stripe_link_quantity',
            value: '{stripe_link_quantity}',
            required: true,
          },
        ],
      },
    },
  })
}
