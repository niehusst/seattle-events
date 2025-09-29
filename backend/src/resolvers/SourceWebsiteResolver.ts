import { SourceWebsiteRepository } from '../services/SourceWebsiteRepository';
import { ISourceWebsite } from '../models/SourceWebsite';

const sourceWebsiteRepository = new SourceWebsiteRepository();

export const SourceWebsiteResolver = {
  Query: {
    sourceWebsites: async () => {
      return await sourceWebsiteRepository.findAll();
    },
  },

  // Add resolver for the nested sourceWebsite field in ScrapingLog
  ScrapingLog: {
    sourceWebsite: async (parent: any) => {
      if (!parent.sourceWebsiteId) {
        return null;
      }
      return await sourceWebsiteRepository.findById(parent.sourceWebsiteId);
    },
  },
};