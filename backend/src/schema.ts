import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules (bcus __dirname doesnt exist for some reason)
const dirPath = dirname(fileURLToPath(import.meta.url));

// Read the schema file
const schema = readFileSync(join(dirPath, '../schema.graphql'), 'utf8');

export const typeDefs = schema;
