import { prisma } from "@/src/lib/prisma";
import ProductGrid from "@/src/components/ProductGrid";

export default async function KatalogPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
      <div className="max-w-xl">
        <h1 className="font-serif text-4xl text-foreground sm:text-5xl">
          Koleksi
        </h1>
        <p className="mt-4 text-muted">
          Setiap potong dirancang untuk melengkapi, bukan membebani —
          perhiasan yang senyap namun berkesan.
        </p>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
