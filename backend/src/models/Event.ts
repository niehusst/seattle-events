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
  sourceWebsiteId: string;
}

export type IEventPartial = Omit<IEvent, 'id' | 'createdAt' | 'updatedAt'>;
