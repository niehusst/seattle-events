import { gql, useQuery, QueryHookOptions } from '@apollo/client';

const GET_EVENTS = gql`
  query GetEvents(
    $limit: Int
    $offset: Int
    $filter: EventFilterInput
    $dateRange: DateTimeFilterInput
  ) {
    events(limit: $limit, offset: $offset, filter: $filter, dateRange: $dateRange) {
      id
      title
      description
      startDate
      endDate
      locationName
      streetAddress
      city
      state
      zipCode
      latitude
      longitude
      eventUrl
      imageUrl
      category
      price
      organizer
      contactInfo
      createdAt
      updatedAt
      scrapedAt
      sourceWebsiteId
    }
  }
`;

const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      id
      title
      description
      startDate
      endDate
      locationName
      streetAddress
      city
      state
      zipCode
      latitude
      longitude
      eventUrl
      imageUrl
      category
      price
      organizer
      contactInfo
      createdAt
      updatedAt
      scrapedAt
      sourceWebsiteId
    }
  }
`;


// Define TypeScript interfaces
export interface IEvent {
  id: string;
  title: string;
  description?: string;
  startDate?: string; // ISO string
  endDate: string; // ISO string
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
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  scrapedAt?: string; // ISO string
  sourceWebsiteId: string;
}

export interface IEventFilter {
  category?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  searchQuery?: string;
}

export const EventService = {
  useEvents: (
    limit?: number,
    offset?: number,
    filter?: IEventFilter,
    dateRange?: { start?: string; end?: string },
    options?: Omit<QueryHookOptions<any, any>, 'variables'>
  ) => {
    return useQuery(GET_EVENTS, {
      variables: { limit, offset, filter, dateRange },
      ...options,
    });
  },

  useEvent: (id: string, options?: Omit<QueryHookOptions<any, any>, 'variables'>) => {
    return useQuery(GET_EVENT, {
      variables: { id },
      ...options,
    });
  },

};

// Export queries for testing purposes only
export const __testOnly__ = {
  GET_EVENTS,
  GET_EVENT,
};
