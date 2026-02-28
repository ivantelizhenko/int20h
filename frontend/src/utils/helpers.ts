export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    value || 0,
  );

export const formatPercent = (value: number) =>
  `${Number(value || 0).toFixed(4)}%`;
