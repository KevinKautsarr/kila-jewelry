"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/src/lib/actions/manageProduct";

export default function DeleteProductButton({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Hapus produk "${productName}"? Tindakan ini tidak bisa dibatalkan.`
    );
    if (!confirmed) return;

    setError(null);
    startTransition(async () => {
      const result = await deleteProduct(productId);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        aria-label={`Hapus produk ${productName}`}
        className="text-sm text-muted transition-colors hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Menghapus..." : "Hapus"}
      </button>
      {error && (
        <p role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
