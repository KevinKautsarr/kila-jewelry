export const orderStatuses = [
  { value: "pending", label: "Menunggu Pembayaran" },
  { value: "paid", label: "Dibayar" },
  { value: "shipped", label: "Dikirim" },
  { value: "completed", label: "Selesai" },
  { value: "cancelled", label: "Dibatalkan" },
] as const;

export type OrderStatusValue = (typeof orderStatuses)[number]["value"];

export const statusLabels: Record<string, string> = Object.fromEntries(
  orderStatuses.map((status) => [status.value, status.label])
);

export function isOrderStatusValue(value: string): value is OrderStatusValue {
  return orderStatuses.some((status) => status.value === value);
}
