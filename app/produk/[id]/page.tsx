import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import { formatRupiah } from "@/src/lib/format";
import AddToCartButton from "@/src/components/AddToCartButton";

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { id: true } });
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

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
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

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

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
