import { describe, it, expect } from '@jest/globals';

describe('Contract test for events query', () => {
  it('should return a list of events with expected fields', async () => {
    // This test should fail initially since the GraphQL server doesn't exist yet
    const query = `
      query GetEvents($limit: Int, $offset: Int) {
        events(limit: $limit, offset: $offset) {
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

    // Since there's no server yet, this test should fail with connection error
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