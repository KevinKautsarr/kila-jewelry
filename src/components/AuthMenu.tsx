"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "lucide-react";

export default function AuthMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return <div className="h-5 w-5" />;
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="text-sm text-foreground transition-opacity hover:opacity-70"
      >
        Masuk
      </Link>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Menu akun"
        className="flex items-center gap-2 text-foreground transition-opacity hover:opacity-70"
      >
        <User className="h-5 w-5" strokeWidth={1.5} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-3 w-48 border border-white/10 bg-black/90 backdrop-blur-md">
          <p className="truncate px-4 py-3 text-sm text-muted">
            {session.user.name}
          </p>
          <Link
            href="/pesanan-saya"
            onClick={() => setOpen(false)}
            className="block border-t border-white/10 px-4 py-3 text-sm text-foreground transition-colors hover:bg-white/5"
          >
            Pesanan Saya
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              signOut({ redirectTo: "/" });
            }}
            className="block w-full border-t border-white/10 px-4 py-3 text-left text-sm text-foreground transition-colors hover:bg-white/5"
          >
            Keluar
          </button>
        </div>
      )}
    </div>
  );
}
