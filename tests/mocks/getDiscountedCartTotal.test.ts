vi.mock("../../src/mocks/utils/fetchUserById", () => ({
  fetchUserById: vi.fn(),
}));
vi.mock("../../src/mocks/utils/fetchCartByUserId", () => ({
  fetchCartByUserId: vi.fn(),
}));
vi.mock("../../src/mocks/utils/getDiscountForUser", () => ({
  getDiscountForUser: vi.fn(),
}));

import { fetchUserById } from "../../src/mocks/utils/fetchUserById";
import { fetchCartByUserId } from "../../src/mocks/utils/fetchCartByUserId";
import { getDiscountForUser } from "../../src/mocks/utils/getDiscountForUser";
import { getDiscountedCartTotal } from "../../src/mocks/getDiscountedCartTotal";

const mockedFetchUserById = vi.mocked(fetchUserById);
const mockedFetchCartByUserId = vi.mocked(fetchCartByUserId);
const mockedGetDiscountForUser = vi.mocked(getDiscountForUser);

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getDiscountedCartTotal()", () => {
  test("returns discounted total when user, cart and discount are valid", async () => {
    // arrange
    mockedFetchUserById.mockResolvedValue({
      id: 4,
      name: "Georges",
      isVIP: false,
    });

    mockedFetchCartByUserId.mockResolvedValue({
      userId: 4,
      items: [{ price: 12 }, { price: 20 }, { price: 10 }],
    });

    mockedGetDiscountForUser.mockReturnValue(0.2);

    // act
    const result = await getDiscountedCartTotal(4);

    // assert
    expect(mockedFetchUserById).toHaveBeenCalledWith(4);
    expect(mockedFetchUserById).toHaveBeenCalledTimes(1);

    expect(mockedFetchCartByUserId).toHaveBeenCalledWith(4);
    expect(mockedFetchCartByUserId).toHaveBeenCalledTimes(1);

    expect(mockedGetDiscountForUser).toHaveBeenCalledWith({
      id: 4,
      name: "Georges",
      isVIP: false,
    });
    expect(mockedGetDiscountForUser).toHaveBeenCalledTimes(1);

    expect(result).toBe(33.6);
  });

  test("returns 0 if items[] is empty", async () => {
    // arrange
    mockedFetchUserById.mockResolvedValue({
      id: 4,
      name: "Georges",
      isVIP: false,
    });

    mockedFetchCartByUserId.mockResolvedValue({
      userId: 4,
      items: [],
    });

    mockedGetDiscountForUser.mockReturnValue(0.2);

    // act
    const result = await getDiscountedCartTotal(4);

    // assert
    expect(result).toBe(0);
  });

  test("returns total without discount when discount = 0", async () => {
    // arrange
    mockedFetchUserById.mockResolvedValue({
      id: 4,
      name: "Georges",
      isVIP: false,
    });

    mockedFetchCartByUserId.mockResolvedValue({
      userId: 4,
      items: [{ price: 10 }, { price: 20 }, { price: 10 }],
    });

    mockedGetDiscountForUser.mockReturnValue(0);

    // act
    const result = await getDiscountedCartTotal(4);

    // assert
    expect(mockedGetDiscountForUser).toHaveBeenCalledTimes(1);

    expect(result).toBe(40);
  });

  test("returns 0 when discount is 100%", async () => {
    // arrange
    mockedFetchUserById.mockResolvedValue({
      id: 4,
      name: "Georges",
      isVIP: false,
    });

    mockedFetchCartByUserId.mockResolvedValue({
      userId: 4,
      items: [{ price: 10 }, { price: 20 }, { price: 10 }],
    });

    mockedGetDiscountForUser.mockReturnValue(1);

    // act
    const result = await getDiscountedCartTotal(4);

    // assert
    expect(result).toBe(0);
  });

  test("returns 0 if user is null", async () => {
    // arrange
    mockedFetchUserById.mockResolvedValue(null);

    // act
    const result = await getDiscountedCartTotal(2);

    // assert
    expect(mockedFetchUserById).toHaveBeenCalledWith(2);
    expect(mockedFetchUserById).toHaveBeenCalledTimes(1);

    expect(mockedFetchCartByUserId).not.toHaveBeenCalled();
    expect(mockedGetDiscountForUser).not.toHaveBeenCalled();

    expect(result).toBe(0);
  });

  test("returns 0 if cart is null", async () => {
    // arrange
    mockedFetchUserById.mockResolvedValue({
      id: 3,
      name: "Georges",
      isVIP: false,
    });

    mockedFetchCartByUserId.mockResolvedValue(null);

    // act
    const result = await getDiscountedCartTotal(3);

    // assert
    expect(mockedFetchUserById).toHaveBeenCalledWith(3);
    expect(mockedFetchUserById).toHaveBeenCalledTimes(1);

    expect(mockedFetchCartByUserId).toHaveBeenCalledWith(3);
    expect(mockedFetchCartByUserId).toHaveBeenCalledTimes(1);

    expect(mockedGetDiscountForUser).not.toHaveBeenCalled();

    expect(result).toBe(0);
  });
});
