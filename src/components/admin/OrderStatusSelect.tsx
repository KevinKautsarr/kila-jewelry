"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { orderStatuses } from "@/src/lib/orderStatus";
import { updateOrderStatus } from "@/src/lib/actions/updateOrderStatus";

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setStatus(value);
    setError(null);
    startTransition(async () => {
      const result = await updateOrderStatus(orderId, value);
      if (!result.success) {
        setError(result.error);
        setStatus(currentStatus);
        return;
      }
      router.refresh();
    });
  };

  return (
    <div>
      <select
        value={status}
        onChange={(event) => handleChange(event.target.value)}
        disabled={isPending}
        className="border border-white/15 bg-transparent px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-white/40 disabled:opacity-50"
      >
        {orderStatuses.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-background"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
