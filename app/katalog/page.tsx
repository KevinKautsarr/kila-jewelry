"use client";

import { motion } from "framer-motion";
import { products } from "@/src/data/products";
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

export default function KatalogPage() {
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

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={item}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
