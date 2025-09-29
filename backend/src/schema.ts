import { readFileSync } from 'fs';
import { join } from 'path';

// Read the schema file
const schema = readFileSync(join(__dirname, '../schema.graphql'), 'utf8');

export const typeDefs = schema;