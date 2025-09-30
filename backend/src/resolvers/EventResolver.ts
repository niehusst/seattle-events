import { EventRepository } from '../services/EventRepository';
import { EventFilterService } from '../services/EventFilterService';

const eventRepository = new EventRepository();
const eventFilterService = new EventFilterService();

export const EventResolver = {
  Query: {
    events: async (
      _parent: any,
      args: { filter?: any; dateRange?: any; limit?: number; offset?: number }
    ) => {
      const { filter, dateRange, limit = 20, offset = 0 } = args;
      return await eventRepository.findAll(limit, offset, filter, dateRange);
    },

    event: async (_parent: any, args: { id: string }) => {
      const event = await eventRepository.findById(args.id);
      if (!event) {
        throw new Error(`Event with id ${args.id} not found`);
      }
      return event;
    },

    eventsReverseChronological: async (_parent: any, args: { limit?: number; offset?: number }) => {
      const { limit = 20, offset = 0 } = args;
      return await eventFilterService.getEventsReverseChronological(limit, offset);
    },

    eventsByDate: async (_parent: any, args: { date: string }) => {
      const date = new Date(args.date);
      return await eventFilterService.filterByDate(date);
    },

    eventsByCategory: async (_parent: any, args: { category: string }) => {
      return await eventFilterService.filterByCategory(args.category);
    },

    upcomingEvents: async (_parent: any, args: { limit?: number }) => {
      const { limit = 20 } = args;
      return await eventFilterService.getUpcomingEvents(limit);
    },
  },

  Mutation: {
    triggerScrape: async (_parent: any, _args: any, _context: any) => {
      // This would trigger the scraping service
      // For now, return true to indicate success
      // In a real implementation, this would call the scraping service
      console.log('Scraping triggered manually');
      return true;
    },
  },
};
