import { prisma } from "@/src/lib/prisma";
import { categories, isCategoryValue } from "@/src/lib/categories";
import ProductGrid from "@/src/components/ProductGrid";
import CategoryFilter from "@/src/components/CategoryFilter";

export default async function KatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string | string[] }>;
}) {
  const { kategori } = await searchParams;
  const kategoriValue = Array.isArray(kategori) ? kategori[0] : kategori;
  const activeCategory =
    kategoriValue && isCategoryValue(kategoriValue) ? kategoriValue : undefined;

  const products = await prisma.product.findMany({
    where: activeCategory ? { category: activeCategory } : undefined,
    orderBy: { createdAt: "asc" },
  });

  const categoryLabel = categories.find(
    (category) => category.value === activeCategory
  )?.label;

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

      <CategoryFilter activeCategory={activeCategory} />

      {products.length === 0 ? (
        <p className="mt-20 text-center text-muted">
          Belum ada produk di kategori ini.
        </p>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
