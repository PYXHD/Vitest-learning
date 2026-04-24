import { fetchCartByUserId } from "./utils/fetchCartByUserId";
import { fetchUserById } from "./utils/fetchUserById";
import { getDiscountForUser } from "./utils/getDiscountForUser";

async function getDiscountedCartTotal(userId: number): Promise<number> {
  const user = await fetchUserById(userId);
  if (!user) return 0;

  const cart = await fetchCartByUserId(userId);
  if (!cart) return 0;

  const discount = getDiscountForUser(user);

  const total = cart.items.reduce((sum, item) => sum + item.price, 0);

  const discountedTotal = total * (1 - discount);

  return discountedTotal;
}

export { getDiscountedCartTotal };
