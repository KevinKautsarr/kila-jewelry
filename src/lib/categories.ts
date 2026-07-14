export const categories = [
  { value: "kalung", label: "Kalung" },
  { value: "cincin", label: "Cincin" },
  { value: "anting", label: "Anting" },
  { value: "gelang", label: "Gelang" },
] as const;

export type CategoryValue = (typeof categories)[number]["value"];

export function isCategoryValue(value: string): value is CategoryValue {
  return categories.some((category) => category.value === value);
}
