<p align="center">
  <img src="public/wordmark.png" alt="KILA" width="240" />
</p>

**A dark, minimalist jewelry e-commerce experience** — built as a full-stack portfolio project with real database-backed checkout, server-side price validation, and a quiet, editorial aesthetic.

### [→ Live Demo](https://kilajewelry.vercel.app/)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://neon.tech/)

---

## Features

- **Product catalog** with category filtering (`/katalog?kategori=...`), server-rendered on demand
- **Product detail pages** statically generated at build time via `generateStaticParams`
- **Shopping cart** with quantity controls, persisted to `localStorage` through a React Context provider
- **Checkout flow** that writes real orders to PostgreSQL — server recomputes prices from the database, wraps the write in a transaction, and stores a name/price *snapshot* per line item
- **Indonesian region selector** (province → city) sourced from a public wilayah API, with automatic and manual fallback to free-text input if the API is slow or unreachable
- **Order confirmation page**, rendered dynamically from the saved order record
- Static content pages: **About, FAQ (animated accordion), Shipping, Returns, Contact** (with a client-side dummy contact form)
- Fully responsive layout, dark luxury theme (`#0a0a0a` background, ivory accents, serif display type)
- Subtle **Framer Motion** transitions (fade-ins, staggered grids, hover states)
- Optimized imagery via `next/image` throughout

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Server Components, Server Actions) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| ORM | Prisma 7 (`prisma-client` generator + `@prisma/adapter-pg` driver adapter) |
| Database | PostgreSQL ([Neon](https://neon.tech/), serverless) |
| Animation | Framer Motion |
| Icons | lucide-react |
| Deployment | Vercel |

## Architecture Highlights

A few decisions worth calling out, since the interesting part of an e-commerce app is rarely the UI:

- **Static vs. dynamic rendering, chosen per route.** The homepage and `/produk/[id]` are statically generated at build time (product IDs come from `generateStaticParams`, so every product page is pre-rendered). `/katalog` is dynamic because it reads `searchParams` for category filtering, which is a request-time API. `/pesanan/[id]` is dynamic for the same reason — an order ID can't be known ahead of build.
- **Price integrity on checkout.** The client only ever sends a `productId` and `quantity` to the `createOrder` Server Action — never a price. The server re-reads the current price from the database and recomputes the total, so a tampered client payload can't under-charge an order.
- **Order snapshots, not live references.** `OrderItem` stores `productName` and `price` as a snapshot at the time of purchase, deliberately *not* as a foreign-key-only relation to `Product`. If a product's price changes — or the product is removed from the catalog entirely — historical orders stay accurate and readable.
- **External API fallback.** The province/city dropdowns call a third-party wilayah API client-side, with a timeout and an explicit manual-entry fallback if the request fails. Checkout never gets blocked by a flaky external dependency.
- **Server/Client component boundaries.** Data-fetching pages (catalog, product detail, homepage) are Server Components that talk to Prisma directly; interactive pieces (cart, region selector, FAQ accordion, contact form) are isolated Client Components, kept as small as reasonably possible.

## Getting Started

### Prerequisites

- Node.js 20+
- A PostgreSQL database (this project was built against [Neon](https://neon.tech/))

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/KevinKautsarr/kila-jewelry.git
cd kila-jewelry

# 2. Install dependencies
npm install

# 3. Configure environment variables
# create a .env file in the project root (see Environment Variables below)

# 4. Apply the database schema
npx prisma migrate dev

# 5. Seed sample products
npx prisma db seed

# 6. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** `prisma generate` runs automatically via a `postinstall` script, so the generated Prisma Client (output to `src/generated/prisma`) is always in sync after `npm install` — this matters on platforms like Vercel where dependency installs are cached.

## Environment Variables

Create a `.env` file in the project root:

```bash
DATABASE_URL="postgresql://<user>:<password>@<host>/<database>?sslmode=verify-full&channel_binding=require"
```

`DATABASE_URL` is required at **both build time and runtime** — the homepage and product pages query the database during `next build` (static generation), while the catalog and order confirmation pages query it on each request.

## Project Structure

```
app/                    # Routes (App Router) — pages, layouts, Server Actions entry points
src/
  components/           # UI components (Navbar, ProductCard, RegionSelect, ...)
  context/              # CartContext (client-side cart state + localStorage sync)
  lib/                  # Prisma client singleton, region API client, formatting utils, Server Actions
  generated/prisma/     # Generated Prisma Client (git-ignored, rebuilt on install)
prisma/
  schema.prisma         # Product, Order, OrderItem models
  migrations/           # SQL migration history
  seed.ts               # Seeds sample product data
```

## Author

**Muhammad Kevin Kautsar**
GitHub: [@KevinKautsarr](https://github.com/KevinKautsarr)

## License

Licensed under the [MIT License](./LICENSE).
