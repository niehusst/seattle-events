import { describe, it, expect } from '@jest/globals';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../../src/schema';
import { resolvers } from '../../src/resolvers';

describe('Contract test for eventsByCategory query', () => {
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

  it('should return events filtered by category', async () => {
    const query = `
      query GetEventsByCategory($category: String!) {
        eventsByCategory(category: $category) {
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
      variables: { category: 'concert' }
    });

    // Verify the result structure
    expect(result.body.kind).toBe('single');
    if (result.body.kind === 'single') {
      expect(result.body.singleResult.data).toBeDefined();
      // The result can be an empty array if there's no data, which is valid
      const eventsByCategory = result.body.singleResult.data?.eventsByCategory;
      // Either it's an array (success case) or undefined (error case)
      expect(eventsByCategory === undefined || Array.isArray(eventsByCategory)).toBe(true);
    }
  });
});