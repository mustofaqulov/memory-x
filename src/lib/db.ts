import { PrismaClient } from '@memoryx/prisma-client';

const globalDb = globalThis as unknown as { memoryxLabDb?: PrismaClient };
export const db = globalDb.memoryxLabDb ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalDb.memoryxLabDb = db;
