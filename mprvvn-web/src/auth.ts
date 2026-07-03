import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Brute-force protection: lock the account for LOCK_MS after MAX_FAILED
// consecutive failed attempts.
const MAX_FAILED = 5;
const LOCK_MS = 15 * 60 * 1000;

// A valid (precomputed) bcrypt hash used to equalize timing when an email
// doesn't exist, so response time doesn't reveal whether an account is
// registered. Precomputed to avoid a hashing cost on every cold start.
const DUMMY_HASH = "$2b$12$zUdgv7IZHuyKigXP1ZdCgOpxm36wmTrAoYi.7tm/a2rJofloaAGG.";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8, // 8-hour admin session
  },
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          // Equalize timing against the no-such-user case.
          await bcrypt.compare(password, DUMMY_HASH);
          return null;
        }

        // Account temporarily locked after too many failures.
        if (user.lockedUntil && user.lockedUntil.getTime() > Date.now()) {
          return null;
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
          const failedLoginCount = user.failedLoginCount + 1;
          const lock = failedLoginCount >= MAX_FAILED;
          await prisma.user.update({
            where: { id: user.id },
            data: {
              failedLoginCount: lock ? 0 : failedLoginCount,
              lockedUntil: lock ? new Date(Date.now() + LOCK_MS) : user.lockedUntil,
            },
          });
          return null;
        }

        // Successful login — clear any failure state.
        if (user.failedLoginCount > 0 || user.lockedUntil) {
          await prisma.user.update({
            where: { id: user.id },
            data: { failedLoginCount: 0, lockedUntil: null },
          });
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? null,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "ADMIN" | "EDITOR";
      }
      return session;
    },
  },
});
