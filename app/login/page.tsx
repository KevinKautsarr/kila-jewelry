import { Suspense } from "react";
import Link from "next/link";
import LoginForm from "@/src/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-24 sm:px-10">
      <h1 className="font-serif text-3xl text-foreground sm:text-4xl">
        Masuk
      </h1>
      <p className="mt-3 text-muted">
        Masuk untuk melihat riwayat pesananmu.
      </p>

      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>

      <p className="mt-8 text-center text-sm text-muted">
        Belum punya akun?{" "}
        <Link href="/register" className="text-foreground underline">
          Daftar
        </Link>
      </p>
    </div>
  );
}
