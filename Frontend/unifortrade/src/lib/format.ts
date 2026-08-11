const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "BRL",
});

export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined) return "—";
  return currencyFormatter.format(price);
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function formatDate(isoDate: string | null | undefined): string {
  if (!isoDate) return "—";
  return dateFormatter.format(new Date(isoDate));
}
