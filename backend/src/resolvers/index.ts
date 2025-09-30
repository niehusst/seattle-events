import { EventResolver } from './EventResolver';
import { SourceWebsiteResolver } from './SourceWebsiteResolver';
import { ScrapingLogResolver } from './ScrapingLogResolver';

// Combine all resolvers
export const resolvers = {
  ...EventResolver,
  ...SourceWebsiteResolver,
  ...ScrapingLogResolver,
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
