import type { Cart } from "./types";

async function fetchCartByUserId(_userId: number): Promise<Cart | null> {
  throw new Error("Not implemented");
}

export { fetchCartByUserId };
