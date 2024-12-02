export type createCustomerInput = {
  stripe_customer_name: string;
  stripe_customer_email: string;
  stripe_customer_phone: string;
};

export type createPaymentInput = {
  stripe_payment_amount: number;
  stripe_payment_currency: string;
  stripe_payment_customer: string;
  stripe_payment_description: string;
};

export type createProductInput = {
  stripe_product_name: string;
  stripe_product_description: string;
  stripe_product_price: number;
  stripe_product_currency: string;
};

export type createLinkInput = {
  stripe_link_price: string;
  stripe_link_quantity: number;
};
