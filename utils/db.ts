import { PrismaClient } from '@prisma/client';

// taken from : https://github.com/Hendrixer/fullstack-ai-nextjs/blob/main/util/db.ts
// checks if there is a prisma connection, if not create one, otherwise use current connection. This keeps prisma from making too many connections to the DB and overloading the server

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
