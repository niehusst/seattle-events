import { describe, it, expect } from '@jest/globals';

describe('Contract test for eventsByCategory query', () => {
  it('should return events filtered by category', async () => {
    const query = `
      query GetEventsByCategory($category: String!) {
        eventsByCategory(category: $category) {
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
          variables: { category: 'concert' }
        })
      })
    ).rejects.toThrow();
  });
});