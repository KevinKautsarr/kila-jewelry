import Link from "next/link";
import Hero from "@/src/components/Hero";
import ProductGrid from "@/src/components/ProductGrid";
import { prisma } from "@/src/lib/prisma";

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
    take: 4,
  });

  return (
    <>
      <Hero />

      <section className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10">
        <div className="max-w-xl">
          <h2 className="font-serif text-3xl text-foreground sm:text-4xl">
            Koleksi Unggulan
          </h2>
          <p className="mt-4 text-muted">
            Pilihan favorit dari seluruh koleksi kami — dirancang untuk
            menemani harimu dengan kilau yang senyap.
          </p>
        </div>

        <ProductGrid products={featuredProducts} />

        <div className="mt-16 flex justify-center">
          <Link
            href="/katalog"
            className="inline-flex items-center border border-white/30 px-8 py-3 text-sm tracking-wide text-foreground transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Lihat Semua Koleksi
          </Link>
        </div>
      </section>
    </>
  );
}
