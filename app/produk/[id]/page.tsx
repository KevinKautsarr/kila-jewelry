import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/src/lib/prisma";
import { formatRupiah } from "@/src/lib/format";
import AddToCartButton from "@/src/components/AddToCartButton";

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { id: true } });
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `https://kilajewelry.vercel.app${product.image}`,
    description: product.description,
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `https://kilajewelry.vercel.app/produk/${product.id}`,
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

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
