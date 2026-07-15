"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { requireAdmin } from "@/src/lib/requireAdmin";
import { isOrderStatusValue } from "@/src/lib/orderStatus";

export type UpdateOrderStatusResult =
  | { success: true }
  | { success: false; error: string };

export async function updateOrderStatus(
  orderId: string,
  status: string
): Promise<UpdateOrderStatusResult> {
  await requireAdmin();

  if (!isOrderStatusValue(status)) {
    return { success: false, error: "Status tidak valid." };
  }

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  } catch {
    return { success: false, error: "Gagal memperbarui status pesanan." };
  }

  revalidatePath("/admin/pesanan");
  revalidatePath(`/admin/pesanan/${orderId}`);
  revalidatePath(`/pesanan/${orderId}`);
  revalidatePath("/pesanan-saya");
  return { success: true };
}
