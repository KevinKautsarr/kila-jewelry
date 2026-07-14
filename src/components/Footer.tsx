import Link from "next/link";

const footerColumns = [
  {
    title: "Belanja",
    links: ["Kalung", "Cincin", "Anting", "Gelang"],
  },
  {
    title: "Bantuan",
    links: ["FAQ", "Pengiriman", "Pengembalian", "Kontak"],
  },
  {
    title: "Sosmed",
    links: ["Instagram", "TikTok", "Pinterest"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <span className="font-serif text-2xl tracking-[0.2em] text-foreground">
              KILA
            </span>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Perhiasan yang dirancang untuk bertahan lebih lama dari tren —
              sederhana, senyap, dan abadi.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-medium text-foreground">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} KILA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
