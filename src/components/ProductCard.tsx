"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/src/data/products";
import { formatRupiah } from "@/src/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produk/${product.id}`} className="group block">
      <div className="relative aspect-square overflow-hidden border border-white/10 bg-white/5 transition-colors duration-300 group-hover:border-white/30">
        <motion.div
          className="h-full w-full bg-gradient-to-br from-white/10 to-transparent"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-xs uppercase tracking-widest text-muted">
          {product.category}
        </p>
        <h3 className="font-serif text-lg text-foreground">{product.name}</h3>
        <p className="text-sm text-muted">{formatRupiah(product.price)}</p>
      </div>
    </Link>
  );
}
