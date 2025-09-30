import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// Read the schema file
const schema = readFileSync(join(__dirname, '../schema.graphql'), 'utf8');

export const typeDefs = schema;