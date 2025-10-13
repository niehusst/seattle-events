import { EventResolver } from './EventResolver';
import { SourceWebsiteResolver } from './SourceWebsiteResolver';

// Combine all resolvers, merging Query and Mutation fields to avoid overwrites
const combinedQuery = {
  ...EventResolver.Query,
  ...SourceWebsiteResolver.Query,
};

// Combine all other resolver types
const combinedOther = {
  ...EventResolver,
  ...SourceWebsiteResolver,
};

export const resolvers = {
  ...combinedOther,
  Query: combinedQuery,
  // Add scalar resolvers if needed
  DateTime: {
    serialize: (date: Date) => date.toISOString(),
    parseValue: (value: string) => new Date(value),
    parseLiteral: (ast: any) => new Date(ast.value),
  },
  Date: {
    serialize: (date: Date) => date.toISOString().split('T')[0],
    parseValue: (value: string) => new Date(value),
    parseLiteral: (ast: any) => new Date(ast.value),
  },
};
