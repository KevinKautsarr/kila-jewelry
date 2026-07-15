import Link from "next/link";
import { requireAdmin } from "@/src/lib/requireAdmin";

const adminNavLinks = [
  { href: "/admin/produk", label: "Produk" },
  { href: "/admin/pesanan", label: "Pesanan" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
      <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
        <aside className="sm:w-48 sm:shrink-0">
          <p className="font-serif text-xl text-foreground">Admin</p>
          <nav className="mt-6 flex gap-6 border-b border-white/10 pb-4 sm:flex-col sm:gap-3 sm:border-b-0 sm:pb-0">
            {adminNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
