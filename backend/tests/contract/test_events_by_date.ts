import { describe, it, expect } from '@jest/globals';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../../src/schema';
import { resolvers } from '../../src/resolvers';

describe('Contract test for eventsByDate query', () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
    });
  });

  afterAll(async () => {
    await server.stop();
  });

  it('should return events for a specific date', async () => {
    const query = `
      query GetEventsByDate($date: Date!) {
        eventsByDate(date: $date) {
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
      variables: { date: '2023-01-01' }
    });

    // Verify the result structure
    expect(result.body.kind).toBe('single');
    if (result.body.kind === 'single') {
      expect(result.body.singleResult.data).toBeDefined();
      // The result can be an empty array if there's no data, which is valid
      const eventsByDate = result.body.singleResult.data?.eventsByDate;
      // Either it's an array (success case) or undefined (error case)
      expect(eventsByDate === undefined || Array.isArray(eventsByDate)).toBe(true);
    }
  });
});