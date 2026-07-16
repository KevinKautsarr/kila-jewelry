import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keranjang",
  description: "Tinjau produk di keranjang belanjamu sebelum checkout.",
  robots: { index: false, follow: false },
};

export default function KeranjangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
