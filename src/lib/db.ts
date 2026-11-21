import { PrismaClient } from '@memoryx/prisma-client';

const globalDb = globalThis as unknown as { memoryxLabDb?: PrismaClient };
export const db = globalDb.memoryxLabDb ?? new PrismaClient(
  process.env.DATABASE_URL_POOLED
    ? { datasources: { db: { url: process.env.DATABASE_URL_POOLED } } }
    : undefined,
);
if (process.env.NODE_ENV !== 'production') globalDb.memoryxLabDb = db;
