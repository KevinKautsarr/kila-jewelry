"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { requireAdmin } from "@/src/lib/requireAdmin";
import { isCategoryValue } from "@/src/lib/categories";

export interface ProductInput {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export type ProductActionResult =
  | { success: true }
  | { success: false; error: string };

function validateProductInput(
  input: ProductInput,
  { isNew }: { isNew: boolean }
): string | null {
  if (isNew && !input.id.trim()) return "ID produk wajib diisi.";
  if (isNew && !/^[a-z0-9-]+$/.test(input.id.trim())) {
    return "ID produk hanya boleh huruf kecil, angka, dan tanda hubung.";
  }
  if (!input.name.trim()) return "Nama produk wajib diisi.";
  if (!Number.isFinite(input.price) || input.price <= 0) {
    return "Harga harus lebih besar dari 0.";
  }
  if (!input.description.trim()) return "Deskripsi wajib diisi.";
  if (!isCategoryValue(input.category)) return "Kategori tidak valid.";
  if (!input.image.trim()) return "Path gambar wajib diisi.";
  return null;
}

export async function createProduct(
  input: ProductInput
): Promise<ProductActionResult> {
  await requireAdmin();

  const error = validateProductInput(input, { isNew: true });
  if (error) return { success: false, error };

  const id = input.id.trim();
  const existing = await prisma.product.findUnique({ where: { id } });
  if (existing) {
    return { success: false, error: "ID produk sudah digunakan." };
  }

  try {
    await prisma.product.create({
      data: {
        id,
        name: input.name.trim(),
        price: Math.round(input.price),
        description: input.description.trim(),
        category: input.category,
        image: input.image.trim(),
      },
    });
  } catch {
    return { success: false, error: "Gagal menyimpan produk." };
  }

  revalidatePath("/admin/produk");
  revalidatePath("/katalog");
  revalidatePath("/");
  return { success: true };
}

export async function updateProduct(
  id: string,
  input: Omit<ProductInput, "id">
): Promise<ProductActionResult> {
  await requireAdmin();

  const error = validateProductInput({ ...input, id }, { isNew: false });
  if (error) return { success: false, error };

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name: input.name.trim(),
        price: Math.round(input.price),
        description: input.description.trim(),
        category: input.category,
        image: input.image.trim(),
      },
    });
  } catch {
    return { success: false, error: "Gagal memperbarui produk." };
  }

  revalidatePath("/admin/produk");
  revalidatePath("/katalog");
  revalidatePath(`/produk/${id}`);
  revalidatePath("/");
  return { success: true };
}

export async function deleteProduct(
  id: string
): Promise<ProductActionResult> {
  await requireAdmin();

  try {
    await prisma.product.delete({ where: { id } });
  } catch {
    return { success: false, error: "Gagal menghapus produk." };
  }

  revalidatePath("/admin/produk");
  revalidatePath("/katalog");
  revalidatePath("/");
  return { success: true };
}
