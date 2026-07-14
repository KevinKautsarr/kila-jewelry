"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-88px)] items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/5 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex max-w-2xl flex-col items-center text-center"
      >
        <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-6xl">
          Keanggunan dalam Setiap Detail
        </h1>
        <p className="mt-6 max-w-md text-base text-muted sm:text-lg">
          Koleksi perhiasan minimalis, dibuat untuk melengkapi keseharianmu
          dengan kilau yang senyap.
        </p>

        <motion.a
          href="/katalog"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-10 inline-flex items-center border border-white/30 px-8 py-3 text-sm tracking-wide text-foreground transition-colors duration-300 hover:bg-white hover:text-black"
        >
          Lihat Koleksi
        </motion.a>
      </motion.div>
    </section>
  );
}
