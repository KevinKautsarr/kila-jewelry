import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <h1 className="font-serif text-4xl text-foreground sm:text-5xl">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-4 max-w-sm text-muted">
        Halaman yang kamu cari mungkin telah dipindahkan atau tidak pernah
        ada.
      </p>

      <Link
        href="/"
        className="mt-10 inline-flex items-center border border-white/30 px-8 py-3 text-sm tracking-wide text-foreground transition-colors duration-300 hover:bg-white hover:text-black"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
