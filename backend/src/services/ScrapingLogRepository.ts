import { PrismaClient, Prisma } from '@prisma/client';
import { IScrapingLog } from '../models/ScrapingLog';

const prisma = new PrismaClient();

export class ScrapingLogRepository {
  async findAll(limit: number = 20, offset: number = 0): Promise<IScrapingLog[]> {
    const logs = await prisma.scrapingLog.findMany({
      orderBy: { scrapedAt: 'desc' },
      skip: offset,
      take: limit,
    });

    return logs as IScrapingLog[];
  }

  async findById(id: string): Promise<IScrapingLog | null> {
    const log = await prisma.scrapingLog.findUnique({
      where: { id },
    });

    return log as IScrapingLog | null;
  }

  async create(logData: Omit<IScrapingLog, 'id' | 'scrapedAt'>): Promise<IScrapingLog> {
    const log = await prisma.scrapingLog.create({
      data: {
        ...logData,
        scrapedAt: new Date(),
      },
    });

    return log as IScrapingLog;
  }

  async update(id: string, logData: Partial<IScrapingLog>): Promise<IScrapingLog> {
    const log = await prisma.scrapingLog.update({
      where: { id },
      data: logData,
    });

    return log as IScrapingLog;
  }

  async delete(id: string): Promise<IScrapingLog> {
    const log = await prisma.scrapingLog.delete({
      where: { id },
    });

    return log as IScrapingLog;
  }

  async findBySourceWebsiteId(sourceWebsiteId: string, limit: number = 20, offset: number = 0): Promise<IScrapingLog[]> {
    const logs = await prisma.scrapingLog.findMany({
      where: { sourceWebsiteId },
      orderBy: { scrapedAt: 'desc' },
      skip: offset,
      take: limit,
    });

    return logs as IScrapingLog[];
  }

  async findByStatus(status: string): Promise<IScrapingLog[]> {
    const logs = await prisma.scrapingLog.findMany({
      where: { status },
      orderBy: { scrapedAt: 'desc' },
    });

    return logs as IScrapingLog[];
  }
}