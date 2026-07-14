import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/src/data/products";
import { formatRupiah } from "@/src/lib/format";

export async function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
      <Link
        href="/katalog"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        &larr; Kembali ke Koleksi
      </Link>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="aspect-square border border-white/10 bg-gradient-to-br from-white/10 to-transparent" />

        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest text-muted">
            {product.category}
          </p>
          <h1 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-foreground">
            {formatRupiah(product.price)}
          </p>
          <p className="mt-6 max-w-md text-muted">{product.description}</p>

          <button
            type="button"
            className="mt-10 inline-flex w-fit items-center border border-white/30 px-8 py-3 text-sm tracking-wide text-foreground transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
