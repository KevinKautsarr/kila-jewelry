import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import { formatRupiah } from "@/src/lib/format";
import { auth } from "@/src/lib/session";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) {
    notFound();
  }

  // Order confirmation links must stay reachable for guest checkouts
  // (no userId to check against) using their unguessable cuid. The one
  // case we actively block: a *different* signed-in user trying to view
  // someone else's order by guessing/reusing an id.
  const session = await auth();
  const viewerId = session?.user?.id;
  const belongsToAnotherUser = order.userId && order.userId !== viewerId;
  if (belongsToAnotherUser) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-24 text-center sm:px-10">
      <p className="text-xs uppercase tracking-widest text-muted">
        Pesanan Berhasil Dibuat
      </p>
      <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">
        Terima Kasih, {order.nama.split(" ")[0]}
      </h1>
      <p className="mt-4 text-muted">
        Pesananmu sedang kami siapkan. Detail pembayaran akan dikirim ke{" "}
        {order.email}.
      </p>

      <div className="mt-14 border border-white/10 p-8 text-left">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Nomor Pesanan</span>
          <span className="font-serif text-foreground">{order.id}</span>
        </div>

        <ul className="mt-6 space-y-4 border-t border-white/10 pt-6">
          {order.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <span className="text-muted">
                {item.productName} &times; {item.quantity}
              </span>
              <span className="text-foreground">
                {formatRupiah(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6 text-sm">
          <span className="text-muted">Total</span>
          <span className="text-foreground">{formatRupiah(order.total)}</span>
        </div>

        <div className="mt-6 border-t border-white/10 pt-6 text-sm text-muted">
          <p>
            {order.alamat}, {order.kota}, {order.provinsi} {order.kodePos}
          </p>
        </div>
      </div>

      <Link
        href="/katalog"
        className="mt-14 inline-flex items-center border border-white/30 px-8 py-3 text-sm tracking-wide text-foreground transition-colors duration-300 hover:bg-white hover:text-black"
      >
        Kembali Belanja
      </Link>
    </div>
  );
}
