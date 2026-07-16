import type { Metadata } from "next";
import PageHeader from "@/src/components/PageHeader";
import FadeIn from "@/src/components/FadeIn";
import FaqAccordion from "@/src/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Pertanyaan yang Sering Diajukan",
  description:
    "Jawaban seputar material, perawatan, ukuran cincin, garansi, dan cara memesan produk KILA.",
};

const faqItems = [
  {
    question: "Material apa yang digunakan untuk perhiasan KILA?",
    answer:
      "Sebagian besar koleksi kami menggunakan perak sterling 925 dengan lapisan rhodium untuk menjaga kilau tetap tahan lama dan tidak mudah kusam.",
  },
  {
    question: "Bagaimana cara merawat perhiasan agar tetap awet?",
    answer:
      "Simpan perhiasan di tempat kering dan hindari kontak langsung dengan parfum, losion, atau air laut. Bersihkan sesekali dengan kain lembut untuk menjaga kilaunya.",
  },
  {
    question: "Apakah cincin bisa disesuaikan ukurannya?",
    answer:
      "Ya, setiap halaman produk cincin mencantumkan panduan ukuran. Untuk penyesuaian di luar ukuran standar, silakan hubungi kami melalui halaman Kontak sebelum memesan.",
  },
  {
    question: "Apakah ada garansi untuk produk yang dibeli?",
    answer:
      "Setiap pembelian mendapat garansi terbatas 6 bulan untuk cacat produksi seperti lapisan yang mengelupas atau sambungan yang lepas dalam pemakaian wajar.",
  },
  {
    question: "Bagaimana cara memesan produk?",
    answer:
      "Pilih produk yang kamu suka, tambahkan ke keranjang, lalu lanjutkan ke halaman keranjang untuk melihat ringkasan pesanan. Fitur checkout penuh masih dalam pengembangan untuk situs portofolio ini.",
  },
  {
    question: "Apakah tersedia kemasan hadiah?",
    answer:
      "Setiap pesanan dikemas dalam kotak khas KILA yang siap dijadikan hadiah, lengkap dengan kantong kain lembut untuk penyimpanan sehari-hari.",
  },
  {
    question: "Metode pembayaran apa saja yang diterima?",
    answer:
      "Kami mendukung transfer bank, kartu debit/kredit, dan dompet digital populer. Semua transaksi diproses melalui mitra pembayaran yang aman.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-24 sm:px-10">
      <FadeIn>
        <PageHeader
          title="Pertanyaan yang Sering Diajukan"
          subtitle="Belum menemukan jawaban yang kamu cari? Hubungi kami langsung melalui halaman Kontak."
        />
      </FadeIn>

      <FadeIn delay={0.15} className="mt-14">
        <FaqAccordion items={faqItems} />
      </FadeIn>
    </div>
  );
}
