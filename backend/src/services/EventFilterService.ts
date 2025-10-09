import { IEvent } from '../models/Event';
import { EventRepository } from './EventRepository';

export class EventFilterService {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  }


  /**
   * Searches events by title or description
   * @param searchTerm The term to search for
   * @returns Promise<IEvent[]> The matching events
   */
  async searchEvents(searchTerm: string): Promise<IEvent[]> {
    // Use the repository's findAll method with a filter
    return await this.eventRepository.findAll(100, 0, { searchQuery: searchTerm });
  }

  /**
   * Filters events by location
   * @param location The location to filter by
   * @returns Promise<IEvent[]> The filtered events
   */
  async filterByLocation(location: string): Promise<IEvent[]> {
    // Use the repository's findAll method with a filter
    return await this.eventRepository.findAll(100, 0, { location });
  }

  /**
   * Combines multiple filters
   * @param filters Object containing various filter criteria
   * @returns Promise<IEvent[]> The filtered events
   */
  async complexFilter(filters: {
    category?: string;
    location?: string;
    dateRange?: { start: Date; end: Date };
    searchQuery?: string;
  }): Promise<IEvent[]> {
    // Construct filter object for the repository
    const filterObj: any = {};
    if (filters.category) filterObj.category = filters.category;
    if (filters.location) filterObj.location = filters.location;
    if (filters.searchQuery) filterObj.searchQuery = filters.searchQuery;

    // Date range filter
    const dateRange = filters.dateRange
      ? {
        after: filters.dateRange.start,
        before: filters.dateRange.end,
      }
      : undefined;

    return await this.eventRepository.findAll(100, 0, filterObj, dateRange);
  }
}
