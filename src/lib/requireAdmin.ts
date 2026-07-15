import { redirect, notFound } from "next/navigation";
import { auth } from "@/src/lib/session";
import { prisma } from "@/src/lib/prisma";

/**
 * Re-checks the admin role against the database rather than trusting the
 * JWT alone, since a token issued before a role change (e.g. an admin being
 * demoted) would otherwise stay valid until it expires.
 */
export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!user || user.role !== "admin") {
    notFound();
  }

  return user;
}
