import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { DuplicateDetectionService } from '../../src/services/DuplicateDetectionService';
import { EventRepository } from '../../src/services/EventRepository';

// Mock the EventRepository with actual mock implementations
jest.mock('../../src/services/EventRepository');

describe('Integration test for duplicate detection', () => {
  let duplicateDetectionService: DuplicateDetectionService;

  beforeEach(() => {
    // Create the service instance
    duplicateDetectionService = new DuplicateDetectionService();
  });

  it('should detect and prevent duplicate events from being stored', async () => {
    // Create a mock repository
    const mockRepo = new EventRepository();
    const mockFindByTitleDateLocation = jest.spyOn(mockRepo, 'findByTitleDateLocation');
    mockFindByTitleDateLocation.mockResolvedValue({
      id: '1',
      title: 'Test Event',
      startDate: undefined,
      endDate: new Date(),
      locationName: 'Test Location',
      eventUrl: 'https://example.com/event',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);

    // Replace the repository in the service instance
    Object.defineProperty(duplicateDetectionService, 'eventRepository', {
      value: mockRepo,
      writable: true
    });

    const result = await duplicateDetectionService.isDuplicate('Test Event', new Date(), 'Test Location');
    
    expect(result).toBe(true);
    expect(mockFindByTitleDateLocation).toHaveBeenCalledWith('Test Event', expect.any(Date), 'Test Location');
  });

  it('should allow new events that are not duplicates', async () => {
    // Create a mock repository
    const mockRepo = new EventRepository();
    const mockFindByTitleDateLocation = jest.spyOn(mockRepo, 'findByTitleDateLocation');
    mockFindByTitleDateLocation.mockResolvedValue(null);

    // Replace the repository in the service instance
    Object.defineProperty(duplicateDetectionService, 'eventRepository', {
      value: mockRepo,
      writable: true
    });

    const result = await duplicateDetectionService.isDuplicate('New Event', new Date(), 'New Location');
    
    expect(result).toBe(false);
    expect(mockFindByTitleDateLocation).toHaveBeenCalledWith('New Event', expect.any(Date), 'New Location');
  });

  it('should detect duplicates by title and date', async () => {
    // Create a mock repository
    const mockRepo = new EventRepository();
    const mockFindAll = jest.spyOn(mockRepo, 'findAll');
    
    // Create an event with the same title and date to simulate a duplicate
    const testDate = new Date();
    mockFindAll.mockResolvedValue([{
      id: '1',
      title: 'Test Event',
      startDate: undefined,
      endDate: testDate,
      eventUrl: 'https://example.com/event',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any]);

    // Replace the repository in the service instance
    Object.defineProperty(duplicateDetectionService, 'eventRepository', {
      value: mockRepo,
      writable: true
    });

    const result = await duplicateDetectionService.isDuplicateByTitleAndDate('Test Event', testDate);
    
    expect(result).toBe(true);
    expect(mockFindAll).toHaveBeenCalledWith(100, 0, { searchQuery: 'Test Event' });
  });
});