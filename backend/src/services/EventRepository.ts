import { PrismaClient, Prisma } from '@prisma/client';
import { IEvent } from '../models/Event';

const prisma = new PrismaClient();

export class EventRepository {
  async findAll(
    limit: number = 20,
    offset: number = 0,
    filter?: any,
    dateRange?: any
  ): Promise<IEvent[]> {
    const whereClause: Prisma.EventWhereInput = {};

    // Add filtering logic if provided
    if (filter) {
      if (filter.category) {
        whereClause.category = filter.category;
      }
      if (filter.location) {
        whereClause.locationName = { contains: filter.location, mode: 'insensitive' };
      }
      if (filter.searchQuery) {
        whereClause.OR = [
          { title: { contains: filter.searchQuery, mode: 'insensitive' } },
          { description: { contains: filter.searchQuery, mode: 'insensitive' } },
        ];
      }
    }

    // Add date range filtering if provided
    if (dateRange) {
      if (dateRange.after) {
        whereClause.startDate = { gte: new Date(dateRange.after) };
      }
      if (dateRange.before) {
        const beforeDate = whereClause.startDate && typeof whereClause.startDate !== 'string' ? 
          { ...whereClause.startDate, lte: new Date(dateRange.before) } : 
          { lte: new Date(dateRange.before) };
        whereClause.startDate = beforeDate;
      }
    }

    const events = await prisma.event.findMany({
      where: whereClause,
      orderBy: { startDate: 'asc' },
      skip: offset,
      take: limit,
    });

    return events as IEvent[];
  }

  async findById(id: string): Promise<IEvent | null> {
    const event = await prisma.event.findUnique({
      where: { id },
    });

    return event as IEvent | null;
  }

  async findByDate(date: Date): Promise<IEvent[]> {
    // Find events on a specific date
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const events = await prisma.event.findMany({
      where: {
        startDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: { startDate: 'asc' },
    });

    return events as IEvent[];
  }

  async findByCategory(category: string): Promise<IEvent[]> {
    const events = await prisma.event.findMany({
      where: { category },
      orderBy: { startDate: 'asc' },
    });

    return events as IEvent[];
  }

  async findUpcoming(limit: number = 20): Promise<IEvent[]> {
    const now = new Date();
    const events = await prisma.event.findMany({
      where: {
        startDate: {
          gte: now,
        },
      },
      orderBy: { startDate: 'asc' },
      take: limit,
    });

    return events as IEvent[];
  }

  async findReverseChronological(limit: number = 20, offset: number = 0): Promise<IEvent[]> {
    const events = await prisma.event.findMany({
      orderBy: { startDate: 'desc' },
      skip: offset,
      take: limit,
    });

    return events as IEvent[];
  }

  async create(eventData: Omit<IEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<IEvent> {
    const event = await prisma.event.create({
      data: {
        ...eventData,
        startDate: new Date(eventData.startDate),
        endDate: eventData.endDate ? new Date(eventData.endDate) : undefined,
        scrapedAt: eventData.scrapedAt ? new Date(eventData.scrapedAt) : undefined,
      },
    });

    return event as IEvent;
  }

  async update(id: string, eventData: Partial<IEvent>): Promise<IEvent> {
    const event = await prisma.event.update({
      where: { id },
      data: {
        ...eventData,
        startDate: eventData.startDate ? new Date(eventData.startDate as unknown as string) : undefined,
        endDate: eventData.endDate ? new Date(eventData.endDate as unknown as string) : undefined,
      },
    });

    return event as IEvent;
  }

  async delete(id: string): Promise<IEvent> {
    const event = await prisma.event.delete({
      where: { id },
    });

    return event as IEvent;
  }

  async findByTitleDateLocation(title: string, startDate: Date, locationName: string): Promise<IEvent | null> {
    const event = await prisma.event.findFirst({
      where: {
        title,
        startDate: new Date(startDate),
        locationName,
      },
    });

    return event as IEvent | null;
  }
}