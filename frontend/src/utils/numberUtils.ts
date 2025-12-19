export function priceFormatter(num: number, decimalFormat = false): string {
  return (
    '$' +
    num.toLocaleString('en-US', {
      minimumFractionDigits: decimalFormat ? 2 : 0,
      maximumFractionDigits: 2,
      currency: 'USD',
    })
  );
};
