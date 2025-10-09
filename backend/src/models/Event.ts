export interface IEvent {
  id: string;
  title: string;
  description?: string;
  startDate?: Date;
  endDate: Date;
  locationName?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  eventUrl: string;
  imageUrl?: string;
  category?: string;
  price?: string;
  organizer?: string;
  contactInfo?: string;
  createdAt: Date;
  updatedAt: Date;
  scrapedAt?: Date;
  sourceWebsiteId: string;
}

// The Prisma client will handle the database operations based on the schema
// This file serves as a type definition and potential extension point for business logic
