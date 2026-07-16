"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Gem, Infinity as InfinityIcon, Hand } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const values = [
  {
    icon: Gem,
    title: "Material Pilihan",
    description:
      "Perak sterling dan lapisan rhodium yang dipilih untuk kilau yang bertahan, bukan sekadar berkilau sesaat.",
  },
  {
    icon: InfinityIcon,
    title: "Desain Abadi",
    description:
      "Bentuk yang sengaja sederhana, dirancang untuk tetap relevan jauh setelah tren berlalu.",
  },
  {
    icon: Hand,
    title: "Dibuat dengan Teliti",
    description:
      "Setiap detail diperiksa dengan saksama, karena kesan mewah lahir dari hal-hal kecil yang selesai dengan benar.",
  },
];

export default function TentangPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
            Tentang KILA
          </h1>
          <p className="mt-6 max-w-md text-base text-muted sm:text-lg">
            Kami percaya perhiasan sejati tidak perlu berteriak untuk
            diperhatikan.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="relative aspect-square"
        >
          <Image
            src="/products/gelang-1.png"
            alt="Gelang perak KILA"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="mx-auto mt-28 max-w-2xl space-y-6 text-muted"
      >
        <p>
          KILA lahir dari keyakinan sederhana: perhiasan terbaik adalah yang
          menemani, bukan yang menuntut perhatian. Setiap potong dirancang
          untuk dipakai setiap hari — di meja kerja, di perjalanan, di
          momen-momen biasa yang justru paling sering kita jalani.
        </p>
        <p>
          Kami menjauhi tren yang datang dan pergi. Sebagai gantinya, kami
          memilih bentuk yang tenang, garis yang bersih, dan material yang
          bertahan lama — supaya perhiasan yang kamu kenakan hari ini masih
          terasa tepat bertahun-tahun ke depan.
        </p>
        <p>
          Sederhana, senyap, dan abadi — bukan sekadar tagline, tapi cara
          kami bekerja di setiap detail, dari pemilihan material hingga
          sentuhan akhir sebelum sampai ke tanganmu.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="mt-28 grid grid-cols-1 gap-12 sm:grid-cols-3"
      >
        {values.map((value) => (
          <div key={value.title} className="text-center sm:text-left">
            <value.icon
              aria-hidden="true"
              className="mx-auto h-6 w-6 text-foreground sm:mx-0"
              strokeWidth={1.5}
            />
            <h2 className="mt-4 font-serif text-lg text-foreground">
              {value.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {value.description}
            </p>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="mt-28 flex flex-col items-center border-t border-white/10 pt-16 text-center"
      >
        <p className="max-w-md text-muted">
          Temukan potongan yang akan menemanimu untuk waktu yang lama.
        </p>
        <Link
          href="/katalog"
          className="mt-8 inline-flex items-center border border-white/30 px-8 py-3 text-sm tracking-wide text-foreground transition-colors duration-300 hover:bg-white hover:text-black"
        >
          Jelajahi Koleksi
        </Link>
      </motion.div>
    </div>
  );
}
