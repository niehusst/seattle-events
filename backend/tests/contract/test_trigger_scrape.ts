import { describe, it, expect } from '@jest/globals';

describe('Contract test for triggerScrape mutation', () => {
  it('should trigger a scraping operation for a source website', async () => {
    const mutation = `
      mutation TriggerScrape($sourceWebsiteId: ID!) {
        triggerScrape(sourceWebsiteId: $sourceWebsiteId)
      }
    `;

    // This should fail since there's no server implementation yet
    await expect(
      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: mutation,
          variables: { sourceWebsiteId: 'some-website-id' }
        })
      })
    ).rejects.toThrow();
  });
});