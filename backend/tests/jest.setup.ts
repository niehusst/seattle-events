import {beforeEach, afterAll} from '@jest/globals';
import { prisma } from './testUtils'

beforeEach(async () => {
  // Clear tables
  await prisma.$executeRawUnsafe('DELETE FROM "Event";'); 
  await prisma.$executeRawUnsafe('DELETE FROM "SourceWebsite";'); 
});

export { prisma };
