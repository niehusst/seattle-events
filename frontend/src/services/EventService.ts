import { gql, useQuery, useMutation } from '@apollo/client';

// Define GraphQL queries and mutations
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
      sourceWebsite
      createdAt
      updatedAt
      scrapedAt
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
      sourceWebsite
      createdAt
      updatedAt
      scrapedAt
    }
  }
`;

const GET_REVERSE_CHRONOLOGICAL_EVENTS = gql`
  query GetEventsReverseChronological($limit: Int, $offset: Int) {
    eventsReverseChronological(limit: $limit, offset: $offset) {
      id
      title
      description
      startDate
      endDate
      locationName
      eventUrl
      imageUrl
      category
      sourceWebsite
    }
  }
`;

const GET_EVENTS_BY_CATEGORY = gql`
  query GetEventsByCategory($category: String!) {
    eventsByCategory(category: $category) {
      id
      title
      description
      startDate
      endDate
      locationName
      eventUrl
      imageUrl
      category
      sourceWebsite
    }
  }
`;

const GET_UPCOMING_EVENTS = gql`
  query GetUpcomingEvents($limit: Int) {
    upcomingEvents(limit: $limit) {
      id
      title
      description
      startDate
      endDate
      locationName
      eventUrl
      imageUrl
      category
      sourceWebsite
    }
  }
`;

const TRIGGER_SCRAPE = gql`
  mutation TriggerScrape($sourceWebsiteId: ID!) {
    triggerScrape(sourceWebsiteId: $sourceWebsiteId)
  }
`;

// Define TypeScript interfaces
export interface IEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string; // ISO string
  endDate?: string; // ISO string
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
  sourceWebsite: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  scrapedAt?: string; // ISO string
}

export interface IEventFilter {
  category?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  searchQuery?: string;
}

// Define service functions
export const EventService = {
  // Query hooks
  useEvents: (limit?: number, offset?: number, filter?: IEventFilter, dateRange?: any) => {
    return useQuery(GET_EVENTS, {
      variables: { limit, offset, filter, dateRange },
    });
  },

  useEvent: (id: string) => {
    return useQuery(GET_EVENT, {
      variables: { id },
    });
  },

  useReverseChronologicalEvents: (limit?: number, offset?: number) => {
    return useQuery(GET_REVERSE_CHRONOLOGICAL_EVENTS, {
      variables: { limit, offset },
    });
  },

  useEventsByCategory: (category: string) => {
    return useQuery(GET_EVENTS_BY_CATEGORY, {
      variables: { category },
    });
  },

  useUpcomingEvents: (limit?: number) => {
    return useQuery(GET_UPCOMING_EVENTS, {
      variables: { limit },
    });
  },

  // Mutation hooks
  useTriggerScrape: () => {
    return useMutation(TRIGGER_SCRAPE);
  },
};

export {
  GET_EVENTS,
  GET_EVENT,
  GET_REVERSE_CHRONOLOGICAL_EVENTS,
  GET_EVENTS_BY_CATEGORY,
  GET_UPCOMING_EVENTS,
  TRIGGER_SCRAPE,
};
