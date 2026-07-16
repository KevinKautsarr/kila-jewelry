"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/src/context/CartContext";
import { formatRupiah } from "@/src/lib/format";
import { createOrder } from "@/src/lib/actions/createOrder";
import RegionSelect from "@/src/components/RegionSelect";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, totalPrice, clearCart } = useCart();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [kodePos, setKodePos] = useState("");
  const [catatan, setCatatan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      setNama((current) => current || session.user.name || "");
      setEmail((current) => current || session.user.email || "");
    }
  }, [session]);

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
        <h1 className="font-serif text-3xl text-foreground sm:text-4xl">
          Keranjang kamu masih kosong
        </h1>
        <p className="mt-4 max-w-sm text-muted">
          Tambahkan produk ke keranjang terlebih dahulu sebelum melanjutkan
          ke checkout.
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await createOrder({
      nama,
      email,
      telepon,
      alamat,
      provinsi,
      kota,
      kodePos,
      catatan,
      items: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    });

    if (!result.success) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    clearCart();
    router.push(`/pesanan/${result.orderId}`);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10">
      <h1 className="font-serif text-4xl text-foreground sm:text-5xl">
        Checkout
      </h1>

      <div className="mt-14 grid grid-cols-1 gap-16 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-8 lg:col-span-2">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="nama"
                className="text-xs uppercase tracking-widest text-muted"
              >
                Nama Lengkap
              </label>
              <input
                id="nama"
                type="text"
                required
                value={nama}
                onChange={(event) => setNama(event.target.value)}
                className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-xs uppercase tracking-widest text-muted"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="telepon"
              className="text-xs uppercase tracking-widest text-muted"
            >
              Nomor Telepon
            </label>
            <input
              id="telepon"
              type="tel"
              required
              value={telepon}
              onChange={(event) => setTelepon(event.target.value)}
              className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
            />
          </div>

          <div>
            <label
              htmlFor="alamat"
              className="text-xs uppercase tracking-widest text-muted"
            >
              Alamat Lengkap
            </label>
            <textarea
              id="alamat"
              required
              rows={3}
              value={alamat}
              onChange={(event) => setAlamat(event.target.value)}
              className="mt-2 w-full resize-none border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
            />
          </div>

          <RegionSelect
            provinsi={provinsi}
            kota={kota}
            onProvinsiChange={setProvinsi}
            onKotaChange={setKota}
          />

          <div className="max-w-xs">
            <label
              htmlFor="kodePos"
              className="text-xs uppercase tracking-widest text-muted"
            >
              Kode Pos
            </label>
            <input
              id="kodePos"
              type="text"
              required
              value={kodePos}
              onChange={(event) => setKodePos(event.target.value)}
              className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
            />
          </div>

          <div>
            <label
              htmlFor="catatan"
              className="text-xs uppercase tracking-widest text-muted"
            >
              Catatan (opsional)
            </label>
            <textarea
              id="catatan"
              rows={2}
              value={catatan}
              onChange={(event) => setCatatan(event.target.value)}
              className="mt-2 w-full resize-none border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-muted">
              Metode Pembayaran
            </p>
            <p className="mt-2 text-sm text-foreground">
              Transfer Bank (dummy) — detail rekening akan dikirim melalui
              email setelah pesanan dibuat.
            </p>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center border border-white/30 px-8 py-3 text-sm tracking-wide text-foreground transition-colors duration-300 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Memproses..." : "Buat Pesanan"}
          </button>
        </form>

        <div className="h-fit border border-white/10 p-8">
          <h2 className="font-serif text-xl text-foreground">
            Ringkasan Pesanan
          </h2>
          <ul className="mt-6 space-y-4">
            {items.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex items-center justify-between gap-4 text-sm"
              >
                <span className="text-muted">
                  {product.name} &times; {quantity}
                </span>
                <span className="text-foreground">
                  {formatRupiah(product.price * quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6 text-sm">
            <span className="text-muted">Total</span>
            <span className="text-foreground">{formatRupiah(totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
