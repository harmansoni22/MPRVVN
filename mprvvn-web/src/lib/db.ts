import { PrismaClient, Prisma } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Neon's serverless compute auto-suspends when idle; the first query after a
// pause can fail with a transient "can't reach database server" error while it
// cold-starts. These error codes are safe to retry (the operation never ran).
const TRANSIENT_CODES = new Set(["P1001", "P1002", "P1008", "P1017"]);

function isTransient(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError && TRANSIENT_CODES.has(error.code)
  );
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Preferred data-layer client. Wraps every query so a transient connection
 * error (typically a Neon cold-start) is retried a few times with backoff,
 * instead of surfacing a 500 to the visitor.
 */
export const db = prisma.$extends({
  name: "retry-transient",
  query: {
    async $allOperations({ args, query }) {
      let lastError: unknown;
      for (let attempt = 0; attempt < 4; attempt++) {
        try {
          return await query(args);
        } catch (error) {
          lastError = error;
          if (!isTransient(error)) throw error;
          await sleep(300 * (attempt + 1));
        }
      }
      throw lastError;
    },
  },
});
