"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { categories, type CategoryValue } from "@/src/lib/categories";

export default function CategoryFilter({
  activeCategory,
}: {
  activeCategory?: CategoryValue;
}) {
  const searchParams = useSearchParams();

  const buildHref = (categoryValue?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryValue) {
      params.set("kategori", categoryValue);
    } else {
      params.delete("kategori");
    }
    const query = params.toString();
    return query ? `/katalog?${query}` : "/katalog";
  };

  return (
    <div className="mt-10 flex flex-wrap gap-3">
      <Link
        href={buildHref()}
        className={`border px-4 py-2 text-xs uppercase tracking-widest transition-colors hover:border-white/60 hover:text-foreground ${
          !activeCategory
            ? "border-white/60 text-foreground"
            : "border-white/15 text-muted"
        }`}
      >
        Semua
      </Link>
      {categories.map((category) => (
        <Link
          key={category.value}
          href={buildHref(category.value)}
          className={`border px-4 py-2 text-xs uppercase tracking-widest transition-colors hover:border-white/60 hover:text-foreground ${
            activeCategory === category.value
              ? "border-white/60 text-foreground"
              : "border-white/15 text-muted"
          }`}
        >
          {category.label}
        </Link>
      ))}
    </div>
  );
}
