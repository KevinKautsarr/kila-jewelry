"use client";

import { motion } from "framer-motion";
import type { Product } from "@/src/generated/prisma/client";
import ProductCard from "@/src/components/ProductCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function ProductGrid({
  products,
  headingLevel,
}: {
  products: Product[];
  headingLevel?: "h2" | "h3";
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((product, index) => (
        <motion.div key={product.id} variants={item}>
          <ProductCard
            product={product}
            priority={index < 4}
            headingLevel={headingLevel}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
