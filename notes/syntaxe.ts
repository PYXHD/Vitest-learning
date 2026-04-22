// === BASICS ===
import { describe, it, test, expect } from "vitest";

describe("group", () => {
  it("should do something", () => {
    expect(1 + 1).toBe(2);
  });
});

describe("group", () => {
  test("should do something", () => {
    expect(1 + 1).toBe(2);
  });
});

// === MOCK FUNCTION ===
import { vi } from "vitest";

const fn = vi.fn();
fn();
expect(fn).toHaveBeenCalled();

// === MOCK RETURN VALUES ===
const mockFn = vi.fn();
mockFn.mockReturnValue(42);
mockFn.mockResolvedValue("async result");
mockFn.mockRejectedValue(new Error("fail"));

// === SPY ===
// Observer une fonction existante sans forcément la remplacer.

const obj = {
  method: () => "real",
};

vi.spyOn(obj, "method");
obj.method();
expect(obj.method).toHaveBeenCalled();

// === MOCK MODULE ===
vi.mock("./api", () => ({
  fetchUser: vi.fn(),
}));

import { fetchUser } from "./api";

fetchUser.mockResolvedValue({ name: "John" });

// === BEFORE EACH / CLEANUP ===
import { beforeEach } from "vitest";

beforeEach(() => {
  vi.clearAllMocks();
});

// === ASYNC TEST ===
it("handles async", async () => {
  const result = await Promise.resolve(42);
  expect(result).toBe(42);
});

// === ERROR TEST ===
it("throws error", () => {
  expect(() => {
    throw new Error("fail");
  }).toThrow("fail");
});

// === ASYNC ERROR ===
it("rejects", async () => {
  await expect(Promise.reject("error")).rejects.toThrow();
});
