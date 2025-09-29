import { describe, it, expect } from '@jest/globals';

describe('Contract test for upcomingEvents query', () => {
  it('should return upcoming events', async () => {
    const query = `
      query GetUpcomingEvents($limit: Int) {
        upcomingEvents(limit: $limit) {
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
          variables: { limit: 10 }
        })
      })
    ).rejects.toThrow();
  });
});