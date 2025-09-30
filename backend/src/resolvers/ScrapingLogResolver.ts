import { ScrapingLogRepository } from '../services/ScrapingLogRepository';

const scrapingLogRepository = new ScrapingLogRepository();

export const ScrapingLogResolver = {
  Query: {
    scrapingLogs: async (_parent: any, args: { limit?: number; offset?: number }) => {
      const { limit = 20, offset = 0 } = args;
      return await scrapingLogRepository.findAll(limit, offset);
    },
  },
};
