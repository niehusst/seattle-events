import { readFileSync } from 'fs';

export const typeDefs = readFileSync('./schema.graphql', 'utf8');
