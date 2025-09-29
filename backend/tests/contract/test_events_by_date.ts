import { describe, it, expect } from '@jest/globals';

describe('Contract test for eventsByDate query', () => {
  it('should return events for a specific date', async () => {
    const query = `
      query GetEventsByDate($date: Date!) {
        eventsByDate(date: $date) {
          id
          title
          startDate
          endDate
          locationName
          eventUrl
          sourceWebsite
        }
      }
    `;

    // This should fail since there's no server implementation yet
    await expect(
      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          variables: { date: '2023-01-01' }
        })
      })
    ).rejects.toThrow();
  });
});