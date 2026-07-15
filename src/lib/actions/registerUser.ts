"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/src/lib/prisma";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export type RegisterResult =
  | { success: true }
  | { success: false; error: string };

const MIN_PASSWORD_LENGTH = 8;

export async function registerUser(
  input: RegisterInput
): Promise<RegisterResult> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const { password } = input;

  if (!name) {
    return { success: false, error: "Nama wajib diisi." };
  }
  if (!email || !email.includes("@")) {
    return { success: false, error: "Email tidak valid." };
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      success: false,
      error: `Kata sandi minimal ${MIN_PASSWORD_LENGTH} karakter.`,
    };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { success: false, error: "Email sudah terdaftar." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: { name, email, passwordHash },
    });
    return { success: true };
  } catch (error) {
    const isUniqueConstraintError =
      error instanceof Error && "code" in error && error.code === "P2002";
    if (isUniqueConstraintError) {
      return { success: false, error: "Email sudah terdaftar." };
    }
    return {
      success: false,
      error: "Gagal membuat akun. Silakan coba lagi.",
    };
  }
}
