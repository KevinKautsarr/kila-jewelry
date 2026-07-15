import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/src/lib/session";
import { prisma } from "@/src/lib/prisma";
import { formatRupiah } from "@/src/lib/format";

const statusLabels: Record<string, string> = {
  pending: "Menunggu Pembayaran",
  paid: "Dibayar",
  shipped: "Dikirim",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

export default async function MyOrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/pesanan-saya");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-24 sm:px-10">
      <h1 className="font-serif text-4xl text-foreground sm:text-5xl">
        Pesanan Saya
      </h1>
      <p className="mt-4 text-muted">
        Riwayat pesanan yang kamu buat saat masuk ke akunmu.
      </p>

      {orders.length === 0 ? (
        <div className="mt-14 border border-white/10 p-8 text-center">
          <p className="text-muted">Kamu belum memiliki pesanan.</p>
          <Link
            href="/katalog"
            className="mt-6 inline-flex items-center border border-white/30 px-8 py-3 text-sm tracking-wide text-foreground transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <ul className="mt-14 space-y-6">
          {orders.map((order) => (
            <li key={order.id} className="border border-white/10 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted">
                    Nomor Pesanan
                  </p>
                  <p className="mt-1 font-serif text-foreground">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-widest text-muted">
                    {new Date(order.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="mt-1 text-sm text-foreground">
                    {statusLabels[order.status] ?? order.status}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-4">
                <p className="text-sm text-muted">
                  {order.items.length} produk
                </p>
                <p className="text-foreground">{formatRupiah(order.total)}</p>
              </div>

              <Link
                href={`/pesanan/${order.id}`}
                className="mt-4 inline-block text-sm text-muted underline transition-colors hover:text-foreground"
              >
                Lihat Detail
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
