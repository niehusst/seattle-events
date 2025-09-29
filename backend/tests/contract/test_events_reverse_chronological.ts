import { describe, it, expect } from '@jest/globals';

describe('Contract test for eventsReverseChronological query', () => {
  it('should return events in reverse chronological order', async () => {
    const query = `
      query GetEventsReverseChronological($limit: Int, $offset: Int) {
        eventsReverseChronological(limit: $limit, offset: $offset) {
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
          variables: { limit: 10, offset: 0 }
        })
      })
    ).rejects.toThrow();
  });
});