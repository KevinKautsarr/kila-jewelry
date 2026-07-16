"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { sortOptions, type SortValue } from "@/src/lib/sort";

export default function SortSelect({
  activeSort,
}: {
  activeSort: SortValue;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "terbaru") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    const queryString = params.toString();
    router.push(queryString ? `/katalog?${queryString}` : "/katalog");
  };

  return (
    <select
      value={activeSort}
      onChange={(event) => handleChange(event.target.value)}
      aria-label="Urutkan produk"
      className="border border-white/15 bg-transparent px-4 py-2 text-xs uppercase tracking-widest text-foreground outline-none transition-colors focus:border-white/40"
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value} className="bg-background">
          {option.label}
        </option>
      ))}
    </select>
  );
}
