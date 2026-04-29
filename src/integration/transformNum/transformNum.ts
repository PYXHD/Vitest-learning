import { bonus, squared, sum } from "./utils/index";

export function transformNum(array: number[]): number {
  const squaredArray = squared(array);
  const summedArray = sum(squaredArray);

  const bonusValue = bonus(summedArray);

  return summedArray + bonusValue;
}
