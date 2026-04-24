export type User = {
  id: number;
  name: string;
  isVIP: boolean;
};

export type Cart = {
  userId: number;
  items: { price: number }[];
};
