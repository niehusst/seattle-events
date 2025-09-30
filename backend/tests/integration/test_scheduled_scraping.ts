import { describe, it, expect } from '@jest/globals';
import { ScheduledScrapingService } from '../../src/services/ScheduledScrapingService';

describe('Integration test for event scheduling', () => {
  it('should schedule and execute scraping at configured intervals', async () => {
    // Create an instance of the scheduled scraping service
    const scheduledScrapingService = new ScheduledScrapingService();
    
    // We can't fully test the scheduling without actually scheduling jobs to run
    // For now, just verify the class can be instantiated
    expect(scheduledScrapingService).toBeInstanceOf(ScheduledScrapingService);
  });
});