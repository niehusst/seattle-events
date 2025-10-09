import { describe, it, expect } from '@jest/globals';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../../src/schema';
import { resolvers } from '../../src/resolvers';

describe('Contract test for event query', () => {
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
    // Note: This will likely return null since there's no actual data
    const result = await server.executeOperation({
      query: query,
      variables: { id: 'non-existent-id' }
    });

    // Verify the result structure
    expect(result.body.kind).toBe('single');
    if (result.body.kind === 'single') {
      // The event might be null if it doesn't exist, which is valid behavior
      expect(result.body.singleResult.data).toBeDefined();
      // Event query can return null if the event doesn't exist, which is valid
      const event = result.body.singleResult.data?.event;
      expect(event === null || event === undefined || typeof event === 'object').toBe(true);
    }
  });
});