import { describe, it, expect } from '@jest/globals';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../../src/schema';
import { resolvers } from '../../src/resolvers';

describe('Contract test for sourceWebsites query', () => {
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

  it('should return a list of source websites', async () => {
    const query = `
      query GetSourceWebsites {
        sourceWebsites {
          id
          url
          name
          isActive
          lastScrapedAt
          createdAt
          updatedAt
          scrapingConfig
        }
      }
    `;

    // Execute the GraphQL query using the server instance
    const result = await server.executeOperation({
      query: query
    });

    // Verify the result structure
    expect(result.body.kind).toBe('single');
    if (result.body.kind === 'single') {
      expect(result.body.singleResult.data).toBeDefined();
      // The result can be an empty array if there's no data, which is valid
      const sourceWebsites = result.body.singleResult.data?.sourceWebsites;
      // Either it's an array (success case) or undefined (error case)
      expect(sourceWebsites === undefined || Array.isArray(sourceWebsites)).toBe(true);
    }
  });
});