import { transformNum } from "../../src/integration/transformNum/transformNum";

describe("transformNum()", () => {
  describe("normal cases", () => {
    test.each([
      [[2, 3, 4], 39],
      [[-2, -3, -6], 59],
      [[8, -6, 4], 121],
    ])("transformNum(%i) -> %i", (input, expected) => {
      expect(transformNum(input)).toBe(expected);
    });
  });

  describe("edge cases", () => {
    test.each([
      [[1], 11],
      [[0, 0], 10],
      [[8, 6], 105],
    ])("transformNum(%i) -> %i", (input, expected) => {
      expect(transformNum(input)).toBe(expected);
    });
  });
});
