import { EventRepository } from '../services/EventRepository';

const eventRepository = new EventRepository();

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

  },

};
