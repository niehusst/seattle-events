import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { ApolloServer } from '@apollo/server';
import { startTestServer, seedEvent } from '../testUtils';
import { IEvent } from '../../src/models/Event';
import { objectMatch } from '../testUtils';

describe('Contract test for events query', () => {
  let server: ApolloServer;

  beforeAll(async () => {
    const { server: testServer } = await startTestServer();
    server = testServer;
  });

  afterAll(async () => {
    await server.stop();
  });

  it('should return a list of events with expected fields', async () => {
    const event = await seedEvent();

    const query = `
      query GetEvents($limit: Int, $offset: Int) {
        events(limit: $limit, offset: $offset) {
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

    // Execute the GraphQL query using the server instance
    const result = await server.executeOperation({
      query: query,
      variables: { limit: 10, offset: 0 }
    });

    // Verify the result structure
    expect(result.body.kind).toBe('single');
    if (result.body.kind === 'single') {
      expect(result.body.singleResult.data).toBeDefined();
      const events = result.body.singleResult.data!.events as IEvent[];
      expect(Array.isArray(events)).toBe(true);
      expect(events.length).toBe(1)
      

      objectMatch(event, events[0]);
    }
  });
});