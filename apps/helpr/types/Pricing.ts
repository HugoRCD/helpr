export type Plan = {
  id: string;
  name: string;
  price: number;
  priceId: string;
  description: string;
  features: string[];
};

export const Plans = {
  PREMIUM: {
    id: 'premium',
    name: 'Premium',
    priceId: 'price_1MTtkUK9pLS9QZZT1eTz3Oyo',
  },
}
