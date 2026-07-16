import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar",
  description: "Buat akun KILA untuk menyimpan riwayat pesananmu.",
  robots: { index: false, follow: false },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
