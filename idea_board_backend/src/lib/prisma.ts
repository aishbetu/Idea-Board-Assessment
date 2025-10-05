import { PrismaClient } from '@prisma/client';

declare global {
  var prismaClient: PrismaClient | undefined;
}

const prisma = global.prismaClient ?? new PrismaClient({
  log: ['warn', 'error', 'query']
});

if (process.env.NODE_ENV !== 'production') {
  global.prismaClient = prisma;
}

export default prisma;