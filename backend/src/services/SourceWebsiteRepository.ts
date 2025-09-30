import { PrismaClient } from '@prisma/client';
import { ISourceWebsite } from '../models/SourceWebsite';

const prisma = new PrismaClient();

export class SourceWebsiteRepository {
  async findAll(): Promise<ISourceWebsite[]> {
    const websites = await prisma.sourceWebsite.findMany({
      orderBy: { name: 'asc' },
    });

    return websites as ISourceWebsite[];
  }

  async findById(id: string): Promise<ISourceWebsite | null> {
    const website = await prisma.sourceWebsite.findUnique({
      where: { id },
    });

    return website as ISourceWebsite | null;
  }

  async create(
    websiteData: Omit<ISourceWebsite, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ISourceWebsite> {
    const website = await prisma.sourceWebsite.create({
      data: {
        ...websiteData,
        scrapingConfig: websiteData.scrapingConfig || null,
      },
    });

    return website as ISourceWebsite;
  }

  async update(id: string, websiteData: Partial<ISourceWebsite>): Promise<ISourceWebsite> {
    const website = await prisma.sourceWebsite.update({
      where: { id },
      data: {
        ...websiteData,
        scrapingConfig:
          websiteData.scrapingConfig !== undefined ? websiteData.scrapingConfig : undefined,
      },
    });

    return website as ISourceWebsite;
  }

  async delete(id: string): Promise<ISourceWebsite> {
    const website = await prisma.sourceWebsite.delete({
      where: { id },
    });

    return website as ISourceWebsite;
  }

  async updateLastScraped(id: string, scrapedAt: Date): Promise<ISourceWebsite> {
    const website = await prisma.sourceWebsite.update({
      where: { id },
      data: { lastScrapedAt: scrapedAt },
    });

    return website as ISourceWebsite;
  }

  async findByUrl(url: string): Promise<ISourceWebsite | null> {
    const website = await prisma.sourceWebsite.findUnique({
      where: { url },
    });

    return website as ISourceWebsite | null;
  }
}
