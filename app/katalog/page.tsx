import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/src/lib/prisma";
import { categories, isCategoryValue } from "@/src/lib/categories";
import { isSortValue, sortToOrderBy, type SortValue } from "@/src/lib/sort";
import ProductGrid from "@/src/components/ProductGrid";
import CategoryFilter from "@/src/components/CategoryFilter";
import SearchBar from "@/src/components/SearchBar";
import SortSelect from "@/src/components/SortSelect";

type KatalogSearchParams = {
  kategori?: string | string[];
  q?: string | string[];
  sort?: string | string[];
};

function resolveCategoryLabel(kategori?: string | string[]) {
  const kategoriValue = Array.isArray(kategori) ? kategori[0] : kategori;
  const activeCategory =
    kategoriValue && isCategoryValue(kategoriValue) ? kategoriValue : undefined;
  return categories.find((category) => category.value === activeCategory)
    ?.label;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<KatalogSearchParams>;
}): Promise<Metadata> {
  const { kategori } = await searchParams;
  const categoryLabel = resolveCategoryLabel(kategori);

  const title = categoryLabel ? `Koleksi ${categoryLabel}` : "Koleksi";
  const description = categoryLabel
    ? `Jelajahi pilihan ${categoryLabel.toLowerCase()} KILA yang senyap namun berkesan.`
    : "Jelajahi seluruh koleksi perhiasan KILA — kalung, cincin, anting, dan gelang minimalis untuk keseharianmu.";

  return {
    title,
    description,
    openGraph: { title: `${title} | KILA`, description },
  };
}

export default async function KatalogPage({
  searchParams,
}: {
  searchParams: Promise<KatalogSearchParams>;
}) {
  const { kategori, q, sort } = await searchParams;

  const kategoriValue = Array.isArray(kategori) ? kategori[0] : kategori;
  const activeCategory =
    kategoriValue && isCategoryValue(kategoriValue) ? kategoriValue : undefined;

  const queryValue = Array.isArray(q) ? q[0] : q;
  const activeQuery = queryValue?.trim() || undefined;

  const sortValue = Array.isArray(sort) ? sort[0] : sort;
  const activeSort: SortValue =
    sortValue && isSortValue(sortValue) ? sortValue : "terbaru";

  const products = await prisma.product.findMany({
    where: {
      ...(activeCategory ? { category: activeCategory } : {}),
      ...(activeQuery
        ? { name: { contains: activeQuery, mode: "insensitive" } }
        : {}),
    },
    orderBy: sortToOrderBy(activeSort),
  });

  const categoryLabel = categories.find(
    (category) => category.value === activeCategory
  )?.label;

  const hasActiveFilters = Boolean(activeCategory || activeQuery);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
      <div className="max-w-xl">
        <h1 className="font-serif text-4xl text-foreground sm:text-5xl">
          {categoryLabel ? `Koleksi ${categoryLabel}` : "Koleksi"}
        </h1>
        <p className="mt-4 text-muted">
          {categoryLabel
            ? `Jelajahi pilihan ${categoryLabel.toLowerCase()} yang senyap namun berkesan.`
            : "Setiap potong dirancang untuk melengkapi, bukan membebani — perhiasan yang senyap namun berkesan."}
        </p>
      </div>

      <Suspense fallback={null}>
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar initialQuery={activeQuery} />
          <SortSelect activeSort={activeSort} />
        </div>

        <CategoryFilter activeCategory={activeCategory} />
      </Suspense>

      {products.length === 0 ? (
        <div className="mt-20 text-center">
          <p className="text-muted">
            {activeQuery
              ? "Tidak ada produk yang cocok."
              : "Belum ada produk di kategori ini."}
          </p>
          {hasActiveFilters && (
            <Link
              href="/katalog"
              className="mt-6 inline-flex items-center border border-white/30 px-8 py-3 text-sm tracking-wide text-foreground transition-colors duration-300 hover:bg-white hover:text-black"
            >
              Reset Pencarian
            </Link>
          )}
        </div>
      ) : (
        <ProductGrid products={products} headingLevel="h2" />
      )}
    </div>
  );
}
