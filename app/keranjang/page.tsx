"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { formatRupiah } from "@/src/lib/format";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
        <h1 className="font-serif text-3xl text-foreground sm:text-4xl">
          Keranjang kamu masih kosong
        </h1>
        <p className="mt-4 max-w-sm text-muted">
          Temukan perhiasan yang melengkapi harimu di koleksi kami.
        </p>
        <Link
          href="/katalog"
          className="mt-10 inline-flex items-center border border-white/30 px-8 py-3 text-sm tracking-wide text-foreground transition-colors duration-300 hover:bg-white hover:text-black"
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
      <h1 className="font-serif text-4xl text-foreground sm:text-5xl">
        Keranjang
      </h1>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <ul className="space-y-8 lg:col-span-2">
          {items.map(({ product, quantity }) => (
            <li
              key={product.id}
              className="flex gap-5 border-b border-white/10 pb-8"
            >
              <div className="relative h-24 w-24 shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted">
                      {product.category}
                    </p>
                    <h2 className="mt-1 font-serif text-lg text-foreground">
                      {product.name}
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      {formatRupiah(product.price)}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label="Hapus dari keranjang"
                    onClick={() => removeFromCart(product.id)}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    <X aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 border border-white/15 px-3 py-1.5">
                    <button
                      type="button"
                      aria-label="Kurangi jumlah"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="text-muted transition-colors hover:text-foreground"
                    >
                      <Minus aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                    <span className="w-4 text-center text-sm text-foreground">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Tambah jumlah"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="text-muted transition-colors hover:text-foreground"
                    >
                      <Plus aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                  </div>

                  <p className="text-sm text-foreground">
                    {formatRupiah(product.price * quantity)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="h-fit border border-white/10 p-8">
          <h2 className="font-serif text-xl text-foreground">Ringkasan</h2>
          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="text-muted">Total</span>
            <span className="text-foreground">{formatRupiah(totalPrice)}</span>
          </div>

          <Link
            href="/checkout"
            className="mt-8 block w-full border border-white/30 px-8 py-3 text-center text-sm tracking-wide text-foreground transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
