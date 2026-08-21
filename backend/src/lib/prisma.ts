import { PrismaClient } from "@prisma/client";

/**
 * PrismaClient Serverless Singleton Pattern
 *
 * In serverless environments (like Vercel Functions), Node.js containers are kept "warm"
 * across multiple invocations. Re-instantiating PrismaClient on each invocation quickly
 * exhausts PostgreSQL connection limits (e.g. max_connections limit reached).
 *
 * Storing the instance on `globalThis` ensures that warm lambdas reuse the existing connection pool.
 */
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });

// Always retain instance on globalThis in all environments (Serverless + Dev)
globalForPrisma.prisma = prisma;

