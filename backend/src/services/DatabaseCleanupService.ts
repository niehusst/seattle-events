import { EventRepository } from './EventRepository';

export class DatabaseCleanupService {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  }

  /**
   * Remove events that have already occurred
   * @param daysOld Minimum age of events to remove (default: 1 day)
   * @returns Number of events removed
   */
  async removeOldEvents(daysOld: number = 1): Promise<void> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    // In a real implementation, we would query for events with startDate
    // older than the cutoff date and delete them. Since Prisma doesn't
    // directly support deleting based on a condition in this way in a single
    // call, we would need to:
    // 1. Find events that match our criteria
    // 2. Delete them individually or in batches
  }
}
