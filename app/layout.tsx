import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { CartProvider } from "@/src/context/CartContext";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kilajewelry.vercel.app"),
  title: {
    default: "KILA | Perhiasan Minimalis Mewah",
    template: "%s | KILA",
  },
  description:
    "KILA adalah butik perhiasan minimalis dengan tema gelap yang mewah — kalung, cincin, anting, dan gelang yang dirancang untuk bertahan lebih lama dari tren.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "KILA",
    title: "KILA | Perhiasan Minimalis Mewah",
    description:
      "Butik perhiasan minimalis dengan tema gelap yang mewah — kalung, cincin, anting, dan gelang yang senyap namun berkesan.",
    url: "https://kilajewelry.vercel.app",
    images: [
      {
        url: "/wordmark.png",
        width: 2084,
        height: 2016,
        alt: "KILA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KILA | Perhiasan Minimalis Mewah",
    description:
      "Butik perhiasan minimalis dengan tema gelap yang mewah — kalung, cincin, anting, dan gelang yang senyap namun berkesan.",
    images: ["/wordmark.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider>
          <CartProvider>
            <Navbar />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
