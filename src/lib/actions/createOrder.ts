"use server";

import { prisma } from "@/src/lib/prisma";

export interface CreateOrderInput {
  nama: string;
  email: string;
  telepon: string;
  alamat: string;
  provinsi: string;
  kota: string;
  kodePos: string;
  catatan?: string;
  items: { productId: string; quantity: number }[];
}

export type CreateOrderResult =
  | { success: true; orderId: string }
  | { success: false; error: string };

export async function createOrder(
  input: CreateOrderInput
): Promise<CreateOrderResult> {
  const { nama, email, telepon, alamat, provinsi, kota, kodePos, catatan, items } =
    input;

  if (!nama.trim() || !email.trim() || !telepon.trim() || !alamat.trim()) {
    return { success: false, error: "Mohon lengkapi semua data wajib." };
  }
  if (!provinsi.trim() || !kota.trim() || !kodePos.trim()) {
    return { success: false, error: "Mohon lengkapi alamat pengiriman." };
  }
  if (items.length === 0) {
    return { success: false, error: "Keranjang kosong." };
  }
  if (items.some((item) => item.quantity <= 0)) {
    return { success: false, error: "Jumlah produk tidak valid." };
  }

  const productIds = items.map((item) => item.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  const productById = new Map(products.map((product) => [product.id, product]));

  if (products.length !== new Set(productIds).size) {
    return {
      success: false,
      error: "Salah satu produk di keranjang sudah tidak tersedia.",
    };
  }

  const orderItemsData = items.map((item) => {
    const product = productById.get(item.productId);
    return {
      productId: item.productId,
      productName: product!.name,
      price: product!.price,
      quantity: item.quantity,
    };
  });

  const total = orderItemsData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  try {
    const order = await prisma.$transaction(async (tx) => {
      return tx.order.create({
        data: {
          nama,
          email,
          telepon,
          alamat,
          provinsi,
          kota,
          kodePos,
          catatan: catatan?.trim() ? catatan.trim() : null,
          total,
          items: {
            create: orderItemsData,
          },
        },
      });
    });

    return { success: true, orderId: order.id };
  } catch {
    return {
      success: false,
      error: "Gagal menyimpan pesanan. Silakan coba lagi.",
    };
  }
}
