import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Read the schema file
const schema = readFileSync('./schema.graphql', 'utf8');

export const typeDefs = schema;
