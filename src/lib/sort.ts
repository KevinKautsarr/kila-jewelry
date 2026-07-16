export const sortOptions = [
  { value: "terbaru", label: "Terbaru" },
  { value: "harga-asc", label: "Harga Terendah" },
  { value: "harga-desc", label: "Harga Tertinggi" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];

export function isSortValue(value: string): value is SortValue {
  return sortOptions.some((option) => option.value === value);
}

export function sortToOrderBy(sort: SortValue | undefined) {
  switch (sort) {
    case "harga-asc":
      return { price: "asc" as const };
    case "harga-desc":
      return { price: "desc" as const };
    case "terbaru":
    default:
      return { createdAt: "desc" as const };
  }
}
