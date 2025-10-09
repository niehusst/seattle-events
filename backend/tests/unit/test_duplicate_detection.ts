import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { DuplicateDetectionService } from '../../src/services/DuplicateDetectionService';
import { EventRepository } from '../../src/services/EventRepository';

// Mock the EventRepository
jest.mock('../../src/services/EventRepository');

describe('Unit tests for duplicate detection', () => {
  let duplicateDetectionService: DuplicateDetectionService;

  beforeEach(() => {
    duplicateDetectionService = new DuplicateDetectionService();
  });

  it('should identify duplicate events correctly', async () => {
    // Create a mock repository
    const mockRepo = new EventRepository();
    const mockFindByTitleDateLocation = jest.spyOn(mockRepo, 'findByTitleDateLocation');
    mockFindByTitleDateLocation.mockResolvedValue({
      id: '1',
      title: 'Test Event',
      startDate: undefined,
      endDate: new Date(),
      locationName: 'Test Location',
      eventUrl: 'http://example.com',
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

  it('should return false when no duplicate is found', async () => {
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

  it('should handle duplicate detection by title and date', async () => {
    // Create a mock repository
    const mockRepo = new EventRepository();
    const mockFindAll = jest.spyOn(mockRepo, 'findAll');
    mockFindAll.mockResolvedValue([{
      id: '1',
      title: 'Test Event',
      startDate: undefined,
      endDate: new Date(),
      eventUrl: 'http://example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any]);

    // Replace the repository in the service instance
    Object.defineProperty(duplicateDetectionService, 'eventRepository', {
      value: mockRepo,
      writable: true
    });

    const result = await duplicateDetectionService.isDuplicateByTitleAndDate('Test Event', new Date());
    
    expect(result).toBe(true);
    expect(mockFindAll).toHaveBeenCalledWith(100, 0, { searchQuery: 'Test Event' });
  });

  it('should return false when no duplicate by title and date is found', async () => {
    // Create a mock repository
    const mockRepo = new EventRepository();
    const mockFindAll = jest.spyOn(mockRepo, 'findAll');
    mockFindAll.mockResolvedValue([{
      id: '1',
      title: 'Different Event',
      startDate: new Date(new Date().getTime() + 86400000), // Different date
      endDate: new Date(new Date().getTime() + 86400000),
      eventUrl: 'http://example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any]);

    // Replace the repository in the service instance
    Object.defineProperty(duplicateDetectionService, 'eventRepository', {
      value: mockRepo,
      writable: true
    });

    const result = await duplicateDetectionService.isDuplicateByTitleAndDate('Test Event', new Date());
    
    expect(result).toBe(false);
    expect(mockFindAll).toHaveBeenCalledWith(100, 0, { searchQuery: 'Test Event' });
  });
});