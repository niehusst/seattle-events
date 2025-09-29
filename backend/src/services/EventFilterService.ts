import { IEvent } from '../models/Event';
import { EventRepository } from './EventRepository';

export class EventFilterService {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  }

  /**
   * Filters events by category
   * @param category The category to filter by
   * @returns Promise<IEvent[]> The filtered events
   */
  async filterByCategory(category: string): Promise<IEvent[]> {
    return await this.eventRepository.findByCategory(category);
  }

  /**
   * Filters events by date
   * @param date The date to filter by
   * @returns Promise<IEvent[]> The filtered events
   */
  async filterByDate(date: Date): Promise<IEvent[]> {
    return await this.eventRepository.findByDate(date);
  }

  /**
   * Gets upcoming events
   * @param limit The maximum number of events to return
   * @returns Promise<IEvent[]> The upcoming events
   */
  async getUpcomingEvents(limit: number = 20): Promise<IEvent[]> {
    return await this.eventRepository.findUpcoming(limit);
  }

  /**
   * Gets events in reverse chronological order
   * @param limit The maximum number of events to return
   * @param offset The number of events to skip
   * @returns Promise<IEvent[]> The events ordered by date (descending)
   */
  async getEventsReverseChronological(limit: number = 20, offset: number = 0): Promise<IEvent[]> {
    return await this.eventRepository.findReverseChronological(limit, offset);
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
    category?: string,
    location?: string,
    dateRange?: { start: Date, end: Date },
    searchQuery?: string
  }): Promise<IEvent[]> {
    // Construct filter object for the repository
    const filterObj: any = {};
    if (filters.category) filterObj.category = filters.category;
    if (filters.location) filterObj.location = filters.location;
    if (filters.searchQuery) filterObj.searchQuery = filters.searchQuery;

    // Date range filter
    const dateRange = filters.dateRange ? {
      after: filters.dateRange.start,
      before: filters.dateRange.end
    } : undefined;

    return await this.eventRepository.findAll(100, 0, filterObj, dateRange);
  }
}