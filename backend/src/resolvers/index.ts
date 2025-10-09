import { EventResolver } from './EventResolver';
import { SourceWebsiteResolver } from './SourceWebsiteResolver';

// Combine all resolvers, merging Query and Mutation fields to avoid overwrites
const combinedQuery = {
  ...EventResolver.Query,
  ...SourceWebsiteResolver.Query,
};

const combinedMutation = {
  ...EventResolver.Mutation,
  ...SourceWebsiteResolver.Mutation,
};

// Combine all other resolver types
const combinedOther = {
  ...EventResolver,
  ...SourceWebsiteResolver,
};

// Remove Query and Mutation from the 'other' combined object to avoid duplication
delete combinedOther.Query;
delete combinedOther.Mutation;

export const resolvers = {
  Query: combinedQuery,
  Mutation: combinedMutation,
  ...combinedOther,
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
