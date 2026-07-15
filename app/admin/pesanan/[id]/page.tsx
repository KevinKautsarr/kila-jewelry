import { notFound } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import { formatRupiah } from "@/src/lib/format";
import OrderStatusSelect from "@/src/components/admin/OrderStatusSelect";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true, user: true },
  });

  if (!order) {
    notFound();
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="font-serif text-2xl text-foreground">
            Pesanan {order.id}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {new Date(order.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted">
            Status
          </p>
          <div className="mt-2">
            <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-xs uppercase tracking-widest text-muted">
            Data Pemesan
          </h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Nama</dt>
              <dd className="text-foreground">{order.nama}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Email</dt>
              <dd className="text-foreground">{order.email}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Telepon</dt>
              <dd className="text-foreground">{order.telepon}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Akun</dt>
              <dd className="text-foreground">
                {order.user ? order.user.email : "Tamu (tanpa akun)"}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-widest text-muted">
            Alamat Pengiriman
          </h2>
          <p className="mt-4 text-sm text-foreground">
            {order.alamat}, {order.kota}, {order.provinsi} {order.kodePos}
          </p>
          {order.catatan && (
            <>
              <h2 className="mt-6 text-xs uppercase tracking-widest text-muted">
                Catatan
              </h2>
              <p className="mt-2 text-sm text-foreground">{order.catatan}</p>
            </>
          )}
        </div>
      </div>

      <h2 className="mt-10 text-xs uppercase tracking-widest text-muted">
        Item Pesanan
      </h2>
      <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
        {order.items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-4 py-4 text-sm"
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
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-muted">Total</span>
        <span className="text-foreground">{formatRupiah(order.total)}</span>
      </div>
    </div>
  );
}
