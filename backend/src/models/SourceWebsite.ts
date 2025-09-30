export interface ISourceWebsite {
  id: string;
  url: string;
  name: string;
  isActive: boolean;
  lastScrapedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  scrapingConfig?: any; // JSON type for scraping configuration
}

// The Prisma client will handle the database operations based on the schema
// This file serves as a type definition and potential extension point for business logic
