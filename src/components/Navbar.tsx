"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/src/context/CartContext";
import Wordmark from "@/src/components/Wordmark";
import AuthMenu from "@/src/components/AuthMenu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/katalog", label: "Katalog" },
  { href: "/tentang", label: "Tentang" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-black/60 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/">
          <Wordmark className="h-7" />
        </Link>

        <ul className="hidden items-center gap-10 text-sm text-muted sm:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          <Link
            href="/keranjang"
            aria-label="Keranjang"
            className="relative text-foreground transition-opacity hover:opacity-70"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
                {totalItems}
              </span>
            )}
          </Link>

          <AuthMenu />
        </div>
      </nav>
    </header>
  );
}
