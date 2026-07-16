"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/src/generated/prisma/client";
import { formatRupiah } from "@/src/lib/format";

export default function ProductCard({
  product,
  priority = false,
  headingLevel: HeadingTag = "h3",
}: {
  product: Product;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <Link href={`/produk/${product.id}`} className="group block">
      <div className="relative aspect-square overflow-hidden border border-transparent transition-colors duration-300 group-hover:border-white/30">
        <motion.div
          className="relative h-full w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
            priority={priority}
          />
        </motion.div>
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-xs uppercase tracking-widest text-muted">
          {product.category}
        </p>
        <HeadingTag className="font-serif text-lg text-foreground">
          {product.name}
        </HeadingTag>
        <p className="text-sm text-muted">{formatRupiah(product.price)}</p>
      </div>
    </Link>
  );
}
