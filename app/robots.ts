import type { MetadataRoute } from "next";

const BASE_URL = "https://kilajewelry.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/checkout",
        "/keranjang",
        "/login",
        "/register",
        "/pesanan-saya",
        "/pesanan/",
        "/api/",
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
