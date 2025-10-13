import { SourceWebsiteRepository } from '../services/SourceWebsiteRepository';

const sourceWebsiteRepository = new SourceWebsiteRepository();

export const SourceWebsiteResolver = {
  Query: {
    sourceWebsites: async () => {
      return await sourceWebsiteRepository.findAll();
    },
  },

};
