import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Kenali filosofi KILA — perhiasan minimalis yang dirancang untuk bertahan lebih lama dari tren.",
};

export default function TentangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
