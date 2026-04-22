vi.mock("../../src/mocks/utils/fetchUserById", () => ({
  fetchUserById: vi.fn(),
}));

import { getUserDisplayName } from "../../src/mocks/getUserDisplayName";
import { fetchUserById } from "../../src/mocks/utils/fetchUserById";

const mockedFetchUserById = vi.mocked(fetchUserById);

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getUserDisplayName()", () => {
  test("returns user name when user is found", async () => {
    // arrange
    mockedFetchUserById.mockResolvedValue({ id: 4, name: "Georges" });

    // act
    const result = await getUserDisplayName(4);

    // assert
    expect(mockedFetchUserById).toHaveBeenCalledWith(4);
    expect(result).toBe("Georges");
  });

  test("returns Anonymous when user is not found", async () => {
    // arrange
    mockedFetchUserById.mockResolvedValue(null);

    // act
    const result = await getUserDisplayName(4);

    // assert
    expect(mockedFetchUserById).toHaveBeenCalledWith(4);
    expect(result).toBe("Anonymous");
  });

  test("throws when fetchUserById fails", async () => {
    // arrange
    mockedFetchUserById.mockRejectedValue(new Error("fail"));

    // act + assert
    await expect(getUserDisplayName(4)).rejects.toThrow("fail");
  });
});
