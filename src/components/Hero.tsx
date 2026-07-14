"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden px-6 sm:px-10">
      <div className="absolute inset-0 -z-20">
        <Image
          src="/products/cincin-1.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25 lg:hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background lg:hidden" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
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

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="relative hidden aspect-square lg:block"
        >
          <Image
            src="/products/cincin-1.png"
            alt="Cincin perak KILA"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
