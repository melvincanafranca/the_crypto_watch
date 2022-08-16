export const formatValue = (value: number) => {
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    notation: "standard",
  }).format(value);
};