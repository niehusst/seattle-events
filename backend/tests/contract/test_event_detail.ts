import { beforeAll, afterAll, describe, it, expect } from '@jest/globals';
import { ApolloServer } from '@apollo/server';
import { objectMatch, seedEvent, startTestServer } from '../testUtils';

describe('Contract test for event query', () => {
  let server: ApolloServer;
  const query = `
      query GetEvent($id: ID!) {
        event(id: $id) {
          id
          title
          description
          startDate
          endDate
          locationName
          streetAddress
          city
          state
          zipCode
          latitude
          longitude
          eventUrl
          imageUrl
          category
          price
          organizer
          contactInfo
          createdAt
          updatedAt
          scrapedAt
        }
      }
    `;

  beforeAll(async () => {
    const { server: testServer } = await startTestServer();
    server = testServer;
  });

  afterAll(async () => {
    await server.stop();
  });

  it('should return a single event by ID with expected fields', async () => {
    const event = await seedEvent();

    const result = await server.executeOperation({
      query: query,
      variables: { id: event.id }
    });

    expect(result.body.kind).toBe('single');
    if (result.body.kind === 'single') {
      expect(result.body.singleResult.data).toBeDefined();
      const actualEvent = result.body.singleResult.data?.event;
      objectMatch(event, actualEvent);
    }
  });

  it('should not find an event for nonexistent ID', async () => {
    const event = await seedEvent();

    const result = await server.executeOperation({
      query: query,
      variables: { id: 'non-existent-id' }
    });

    expect(result.body.kind).toBe('single');
    if (result.body.kind === 'single') {
      expect(result.body.singleResult.data).toBeDefined();
      // Event query can return null if the event doesn't exist, which is valid
      const actualEvent = result.body.singleResult.data?.event;
      expect(actualEvent).toBe(null)
    }
  });
});