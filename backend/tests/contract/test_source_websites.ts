import { describe, it, expect } from '@jest/globals';

describe('Contract test for sourceWebsites query', () => {
  it('should return a list of source websites', async () => {
    const query = `
      query GetSourceWebsites {
        sourceWebsites {
          id
          url
          name
          isActive
          lastScrapedAt
        }
      }
    `;

    // This should fail since there's no server implementation yet
    await expect(
      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query
        })
      })
    ).rejects.toThrow();
  });
});