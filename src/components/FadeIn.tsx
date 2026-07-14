"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function FadeIn({
  children,
  delay = 0,
  className,
  viewportTrigger = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  viewportTrigger?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      {...(viewportTrigger
        ? { whileInView: "show", viewport: { once: true, margin: "-80px" } }
        : { animate: "show" })}
      variants={fadeUp}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
