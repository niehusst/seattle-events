

export interface IScrapingLog {
  id: string;
  sourceWebsiteId: string;
  status: string; // success, error, partial
  eventsFound: number;
  eventsAdded: number;
  eventsUpdated: number;
  eventsSkipped: number; // duplicates
  durationMs: number;
  errorDetails?: string;
  scrapedAt: Date;
}

// The Prisma client will handle the database operations based on the schema
// This file serves as a type definition and potential extension point for business logic