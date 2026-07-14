"use client";

import { useState } from "react";
import { useCart } from "@/src/context/CartContext";
import type { Product } from "@/src/generated/prisma/client";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mt-10 inline-flex w-fit items-center border border-white/30 px-8 py-3 text-sm tracking-wide text-foreground transition-colors duration-300 hover:bg-white hover:text-black"
    >
      {added ? "Ditambahkan ✓" : "Tambah ke Keranjang"}
    </button>
  );
}
