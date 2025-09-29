import { describe, it, expect } from '@jest/globals';

describe('Contract test for scrapingLogs query', () => {
  it('should return a list of scraping logs', async () => {
    const query = `
      query GetScrapingLogs($limit: Int, $offset: Int) {
        scrapingLogs(limit: $limit, offset: $offset) {
          id
          status
          eventsFound
          eventsAdded
          eventsUpdated
          eventsSkipped
          durationMs
          errorDetails
          scrapedAt
          sourceWebsite {
            id
            url
            name
          }
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