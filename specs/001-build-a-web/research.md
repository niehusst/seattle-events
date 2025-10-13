# Research Findings: Seattle Events Web Application

## Event Scraping Implementation
**Decision**: Use Puppeteer with Cheerio for web scraping, with scheduled execution via node-cron
**Rationale**: Puppeteer allows handling of dynamic content that may be loaded via JavaScript, while Cheerio provides efficient server-side DOM manipulation for static content. Node-cron provides reliable scheduling for daily scraping.
**Alternatives considered**: 
- Simple HTTP requests with Cheerio only (insufficient for JS-rendered content)
- Playwright (more complex than needed for basic scraping)
- Third-party scraping services (more expensive and less control)

## PostgreSQL Integration
**Decision**: Use Prisma ORM for PostgreSQL integration with TypeScript
**Rationale**: Prisma provides excellent TypeScript support, automatic type generation, and an intuitive query builder that integrates well with GraphQL resolvers. It also handles database migrations efficiently.
**Alternatives considered**: 
- Raw SQL queries (less type safety, more manual work)
- TypeORM (more complex setup)
- Knex.js (lower-level than needed)

## Web Scraping Scheduler
**Decision**: Use node-cron for scheduling daily scraping tasks
**Rationale**: node-cron is lightweight, well-documented, and specifically designed for Node.js applications. It allows for precise scheduling using cron expressions.
**Alternatives considered**: 
- Agenda.js (more complex with database requirements)
- Bull (Redis-dependent)
- setTimeout/setInterval (less precise scheduling)

## Duplicate Detection in PostgreSQL
**Decision**: Use database-level constraints with a composite unique index on title and date
**Rationale**: Database constraints provide the most reliable way to prevent duplicates at the source. A composite index on title and date (with end date if applicable) will prevent insertion of duplicate events. Additionally, implement application-level checks for better error handling.
**Alternatives considered**: 
- Application-only checks (not reliable if multiple processes running)
- Manual comparison before insert (inefficient)

## GraphQL API Design
**Decision**: Use Apollo Server with TypeScript for GraphQL API implementation
**Rationale**: Apollo Server provides excellent TypeScript support, extensive documentation, and powerful tooling for GraphQL development. It integrates well with PostgreSQL via Prisma.
**Alternatives considered**: 
- Express with custom GraphQL setup (more manual work)
- Hasura (requires more complex setup for custom business logic)
- REST API (less flexible than GraphQL for the frontend)

## Primary Technology Stack
Based on the requirements provided, the following technology stack has been confirmed:
- Frontend: React with TypeScript and Vite
- Backend: Express.js with GraphQL (Apollo Server)
- Database: PostgreSQL
- Testing: Jest, React Testing Library, Supertest
- Scheduling: node-cron
- ORM: Prisma
- Scraping: Puppeteer + Cheerio