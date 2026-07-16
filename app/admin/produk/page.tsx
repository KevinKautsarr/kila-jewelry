import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/src/lib/prisma";
import { formatRupiah } from "@/src/lib/format";
import DeleteProductButton from "@/src/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-2xl text-foreground">Produk</h1>
        <Link
          href="/admin/produk/baru"
          className="inline-flex items-center border border-white/30 px-6 py-2.5 text-sm tracking-wide text-foreground transition-colors duration-300 hover:bg-white hover:text-black"
        >
          Tambah Produk
        </Link>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-muted">
              <th className="py-3 pr-4 font-normal">Produk</th>
              <th className="py-3 pr-4 font-normal">Kategori</th>
              <th className="py-3 pr-4 font-normal">Harga</th>
              <th className="py-3 pr-4 font-normal" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-white/10">
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-foreground">{product.name}</p>
                      <p className="text-xs text-muted">{product.id}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 pr-4 text-muted">{product.category}</td>
                <td className="py-4 pr-4 text-foreground">
                  {formatRupiah(product.price)}
                </td>
                <td className="py-4 pr-4">
                  <div className="flex items-center justify-end gap-5">
                    <Link
                      href={`/admin/produk/${product.id}/edit`}
                      aria-label={`Edit produk ${product.name}`}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      Edit
                    </Link>
                    <DeleteProductButton
                      productId={product.id}
                      productName={product.name}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
