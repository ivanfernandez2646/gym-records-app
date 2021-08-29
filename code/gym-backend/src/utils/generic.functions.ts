export function calculateBMI(weight: number, height: number): number {
  return parseFloat((weight / height ** 2).toFixed(2));
}
