import PageHeader from "@/src/components/PageHeader";
import FadeIn from "@/src/components/FadeIn";

export default function PengembalianPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-24 sm:px-10">
      <FadeIn>
        <PageHeader
          title="Kebijakan Pengembalian"
          subtitle="Kami ingin kamu merasa yakin dengan setiap pembelian — berikut ketentuan pengembalian yang berlaku."
        />
      </FadeIn>

      <FadeIn delay={0.15} className="mt-14 space-y-10 text-muted">
        <div>
          <h2 className="font-serif text-xl text-foreground">
            Syarat &amp; Jangka Waktu
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            Pengembalian dapat diajukan dalam waktu 14 hari sejak pesanan
            diterima. Produk harus dalam kondisi belum dipakai, tidak rusak,
            dan disertai kemasan asli beserta bukti pembelian.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground">
            Kondisi Barang
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            Produk yang dikembalikan harus dalam kondisi sama seperti saat
            diterima — tanpa goresan pemakaian, noda, atau perubahan bentuk.
            Kami berhak menolak pengembalian yang tidak memenuhi syarat ini.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground">
            Proses Pengembalian
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
            <li>Hubungi kami melalui halaman Kontak dengan nomor pesanan.</li>
            <li>
              Tim kami akan mengirimkan instruksi dan alamat pengembalian
              barang.
            </li>
            <li>
              Kemas produk dengan aman beserta kemasan asli dan kirimkan
              sesuai instruksi.
            </li>
            <li>
              Setelah barang diperiksa dan disetujui, dana akan dikembalikan
              dalam 5–7 hari kerja.
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground">Pengecualian</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Produk yang telah dipersonalisasi atau disesuaikan ukurannya atas
            permintaan khusus tidak dapat dikembalikan, kecuali terdapat
            cacat produksi.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
