import PageHeader from "@/src/components/PageHeader";
import FadeIn from "@/src/components/FadeIn";

export default function PengirimanPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-24 sm:px-10">
      <FadeIn>
        <PageHeader
          title="Informasi Pengiriman"
          subtitle="Kami mengemas dan mengirimkan setiap pesanan dengan hati-hati, agar sampai ke tanganmu dalam kondisi terbaik."
        />
      </FadeIn>

      <FadeIn delay={0.15} className="mt-14 space-y-10 text-muted">
        <div>
          <h2 className="font-serif text-xl text-foreground">
            Estimasi Waktu Pengiriman
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            Pesanan diproses dalam 1–2 hari kerja setelah pembayaran
            dikonfirmasi. Waktu pengiriman selanjutnya bergantung pada lokasi
            tujuan:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            <li>Jabodetabek: 1–2 hari kerja</li>
            <li>Pulau Jawa &amp; Bali: 2–4 hari kerja</li>
            <li>Luar Pulau Jawa: 3–7 hari kerja</li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground">
            Metode Pengiriman
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            Kami bekerja sama dengan jasa kurir terpercaya dan menyediakan
            opsi reguler maupun ekspres saat proses checkout, menyesuaikan
            kebutuhan dan urgensi pengiriman.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground">
            Area Jangkauan &amp; Biaya
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            Kami melayani pengiriman ke seluruh wilayah Indonesia. Biaya
            pengiriman dihitung otomatis berdasarkan berat paket dan lokasi
            tujuan, dan akan ditampilkan sebelum pesanan dikonfirmasi.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground">
            Melacak Pesanan
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            Setelah pesanan dikirim, kamu akan menerima nomor resi melalui
            email atau WhatsApp yang dapat digunakan untuk melacak posisi
            paket secara langsung melalui situs kurir terkait.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
