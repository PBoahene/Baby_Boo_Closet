export const CURRENCY_CODE = "GHS";
export const CURRENCY_SYMBOL = "GH₵";

export function formatCurrency(amount: number): string {
  const value = Number.isFinite(amount) ? amount : 0;
  return `${CURRENCY_SYMBOL}${value.toFixed(2)}`;
}