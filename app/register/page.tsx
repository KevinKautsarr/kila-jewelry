"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { registerUser } from "@/src/lib/actions/registerUser";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await registerUser({ name, email, password });

    if (!result.success) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    const signInResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signInResult?.error) {
      router.push("/login");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-24 sm:px-10">
      <h1 className="font-serif text-3xl text-foreground sm:text-4xl">
        Buat Akun
      </h1>
      <p className="mt-3 text-muted">
        Daftar untuk menyimpan riwayat pesananmu.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div>
          <label
            htmlFor="name"
            className="text-xs uppercase tracking-widest text-muted"
          >
            Nama
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-xs uppercase tracking-widest text-muted"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-xs uppercase tracking-widest text-muted"
          >
            Kata Sandi
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
          />
          <p className="mt-2 text-xs text-muted">Minimal 8 karakter.</p>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full border border-white/30 px-8 py-3 text-sm tracking-wide text-foreground transition-colors duration-300 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Memproses..." : "Daftar"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-muted">
        Sudah punya akun?{" "}
        <Link href="/login" className="text-foreground underline">
          Masuk
        </Link>
      </p>
    </div>
  );
}
