import type { MetadataRoute } from "next";
import { prisma } from "@/src/lib/prisma";

const BASE_URL = "https://kilajewelry.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({
    select: { id: true, createdAt: true },
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/katalog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/tentang`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/kontak`, changeFrequency: "monthly", priority: 0.4 },
    {
      url: `${BASE_URL}/pengiriman`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/pengembalian`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/produk/${product.id}`,
    lastModified: product.createdAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
