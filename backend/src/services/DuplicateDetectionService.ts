import { EventRepository } from './EventRepository';

export class DuplicateDetectionService {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  }

  /**
   * Checks if an event is a duplicate based on title, date, and location
   * @param title The title of the event
   * @param date The date of the event
   * @param location The location of the event
   * @returns Promise<boolean> True if duplicate exists, false otherwise
   */
  async isDuplicate(title: string, date: Date, location: string): Promise<boolean> {
    // Check if an event with the same title, date and location already exists
    const existingEvent = await this.eventRepository.findByTitleDateLocation(title, date, location);

    return existingEvent !== null;
  }

  /**
   * Alternative duplicate detection method using only title and date
   * @param title The title of the event
   * @param date The date of the event
   * @returns Promise<boolean> True if duplicate exists, false otherwise
   */
  async isDuplicateByTitleAndDate(title: string, date: Date): Promise<boolean> {
    // Find events with the same title and date
    const events = await this.eventRepository.findAll(100, 0, {
      searchQuery: title,
    });

    // Check if any of these events have the same date
    const duplicate = events.find(
      (event) => event.title === title && event.endDate.getTime() === date.getTime()
    );

    return duplicate !== undefined;
  }

  /**
   * Cleans up old events that have already occurred
   * @returns Promise<number> Number of events removed
   */
  async removeOldEvents(): Promise<number> {
    // TODO: actually delete events
    return 0;
  }
}
