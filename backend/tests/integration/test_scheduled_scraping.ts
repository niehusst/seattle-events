import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ScheduledScrapingService } from '../../src/services/ScheduledScrapingService';
import { ScrapingService } from '../../src/services/ScrapingService';

// Mock the ScrapingService
jest.mock('../../src/services/ScrapingService');

describe('Integration test for event scheduling', () => {
  let scheduledScrapingService: ScheduledScrapingService;

  beforeEach(() => {
    // Create the scheduled scraping service
    scheduledScrapingService = new ScheduledScrapingService();
  });

  it('should schedule and execute scraping at configured intervals', async () => {
    // Mock the internal scraping service methods
    const mockInitialize = jest.spyOn((scheduledScrapingService as any).scrapingService, 'initialize');
    const mockScrapeAll = jest.spyOn((scheduledScrapingService as any).scrapingService, 'scrapeAllWebsites');
    mockInitialize.mockResolvedValue(undefined);
    mockScrapeAll.mockResolvedValue(undefined);

    // Call start to begin the scheduled scraping process
    await scheduledScrapingService.start();

    // Verify that the initialization and initial scrape were called
    expect(mockInitialize).toHaveBeenCalled();
    expect(mockScrapeAll).toHaveBeenCalled();
  });

  it('should allow manual triggering of scraping', async () => {
    // Mock the scraping method
    const mockScrapeAll = jest.spyOn((scheduledScrapingService as any).scrapingService, 'scrapeAllWebsites');
    mockScrapeAll.mockResolvedValue(undefined);

    // Call the forceScrape method
    await scheduledScrapingService.forceScrape();

    // Verify that scraping was called
    expect(mockScrapeAll).toHaveBeenCalled();
  });

  it('should stop scheduled scraping when requested', () => {
    // Mock a scheduled task object
    const mockTask = {
      stop: jest.fn()
    };
    
    // Set the internal task property to our mock
    Object.defineProperty(scheduledScrapingService, 'task', {
      value: mockTask,
      writable: true
    });

    // Call stop to stop the scheduled scraping
    scheduledScrapingService.stop();

    // Verify that the task stop method was called
    expect(mockTask.stop).toHaveBeenCalled();
  });
});
