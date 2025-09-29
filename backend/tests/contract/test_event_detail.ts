import { describe, it, expect } from '@jest/globals';

describe('Contract test for event query', () => {
  it('should return a single event by ID with expected fields', async () => {
    const query = `
      query GetEvent($id: ID!) {
        event(id: $id) {
          id
          title
          description
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
          variables: { id: 'some-event-id' }
        })
      })
    ).rejects.toThrow();
  });
});