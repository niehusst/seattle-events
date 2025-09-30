import { PrismaClient } from '@prisma/client';

// Create a global instance of PrismaClient for use in the application
// In production, be careful about creating multiple instances which could lead to connection pool exhaustion
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

export default prisma;
