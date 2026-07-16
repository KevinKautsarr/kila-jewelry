import Link from "next/link";
import { prisma } from "@/src/lib/prisma";
import { formatRupiah } from "@/src/lib/format";
import { statusLabels } from "@/src/lib/orderStatus";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <h1 className="font-serif text-2xl text-foreground">Pesanan</h1>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-muted">
              <th className="py-3 pr-4 font-normal">Nomor</th>
              <th className="py-3 pr-4 font-normal">Pemesan</th>
              <th className="py-3 pr-4 font-normal">Tanggal</th>
              <th className="py-3 pr-4 font-normal">Total</th>
              <th className="py-3 pr-4 font-normal">Status</th>
              <th className="py-3 pr-4 font-normal" />
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-white/10">
                <td className="py-4 pr-4 font-serif text-foreground">
                  {order.id.slice(0, 10)}…
                </td>
                <td className="py-4 pr-4 text-muted">
                  {order.nama}
                  {!order.userId && (
                    <span className="ml-2 text-xs uppercase tracking-widest text-muted/60">
                      Tamu
                    </span>
                  )}
                </td>
                <td className="py-4 pr-4 text-muted">
                  {new Date(order.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="py-4 pr-4 text-foreground">
                  {formatRupiah(order.total)}
                </td>
                <td className="py-4 pr-4 text-muted">
                  {statusLabels[order.status] ?? order.status}
                </td>
                <td className="py-4 pr-4 text-right">
                  <Link
                    href={`/admin/pesanan/${order.id}`}
                    aria-label={`Detail pesanan ${order.nama}`}
                    className="text-sm text-muted underline transition-colors hover:text-foreground"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
