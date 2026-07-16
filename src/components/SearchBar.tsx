"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export default function SearchBar({ initialQuery }: { initialQuery?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery ?? "");

  const navigateWithQuery = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }
    const queryString = params.toString();
    router.push(queryString ? `/katalog?${queryString}` : "/katalog");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigateWithQuery(query);
  };

  const handleClear = () => {
    setQuery("");
    navigateWithQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-sm">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        strokeWidth={1.5}
      />
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Cari produk..."
        aria-label="Cari produk"
        className="w-full border-b border-white/15 bg-transparent py-2 pl-7 pr-7 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-white/40"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Hapus pencarian"
          className="absolute right-0 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-foreground"
        >
          <X aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
        </button>
      )}
    </form>
  );
}
