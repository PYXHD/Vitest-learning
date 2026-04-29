export function sum(array: number[]): number {
  return array.reduce((acc, item) => acc + item, 0);
}
