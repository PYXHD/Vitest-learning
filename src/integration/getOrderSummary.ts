import { getUserDisplayName } from "../mocks/getUserDisplayName";
import { getDiscountedCartTotal } from "../mocks/getDiscountedCartTotal";
import { fetchCartByUserId } from "../mocks/utils/fetchCartByUserId";

type Order = {
  userName: string;
  itemCount: number;
  total: number;
};

export async function getOrderSummary(userId: number): Promise<Order> {
  const userName = await getUserDisplayName(userId);
  const cart = await fetchCartByUserId(userId);

  return {
    userName: userName,
    itemCount: cart ? cart.items.length : 0,
    total: cart ? await getDiscountedCartTotal(userId) : 0,
  };
}
