/* Indian Rupee formatting helpers */
export function formatINR(amount) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);
  } catch {
    return `₹ ${formatIndianNumber(amount)}`;
  }
}

/* Fallback Indian number grouping (e.g., 12,34,567) */
export function formatIndianNumber(x) {
  const str = Math.round(x).toString();
  const lastThree = str.slice(-3);
  const other = str.slice(0, -3);
  return other !== "" ? other.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree : lastThree;
}

/* Discount calculation and label helper */
export function discountLabel(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return null;
  const pct = Math.round(((originalPrice - price) / originalPrice) * 100);
  return `${pct}% OFF`;
}

