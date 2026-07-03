/**
 * Create or update the admin account WITHOUT touching any content.
 *
 * Safe to run against production (unlike `prisma db seed`, which wipes data).
 * Use it to create the first admin on a fresh deployment, or to rotate the
 * password later.
 *
 *   ADMIN_EMAIL=you@gov.in ADMIN_PASSWORD='a-strong-password' npm run create-admin
 *
 * It also resets any failed-login lockout on the account.
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Load .env when run directly via tsx (the Prisma CLI loads it for `db seed`,
// but this script is invoked through node/tsx). In production the env comes from
// the host, so a missing .env is fine.
try {
  process.loadEnvFile?.();
} catch {
  /* no .env file present — rely on real environment variables */
}

const db = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("✗ ADMIN_EMAIL and ADMIN_PASSWORD must be set.");
    process.exit(1);
  }
  if (password.length < 12) {
    console.error("✗ ADMIN_PASSWORD must be at least 12 characters for a production admin.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await db.user.upsert({
    where: { email },
    update: { passwordHash, role: "ADMIN", failedLoginCount: 0, lockedUntil: null },
    create: { email, name: "Administrator", passwordHash, role: "ADMIN" },
  });

  console.log(`✔ Admin ready: ${user.email} (role ${user.role})`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
