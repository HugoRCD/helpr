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
    priceId: 'price_1QRwxcK9pLS9QZZTthOmdsl6',
  },
}
