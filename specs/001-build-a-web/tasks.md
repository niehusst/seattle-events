# Tasks: Seattle Events Web Application

**Input**: Design documents from `/specs/001-build-a-web/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 3.1: Setup
- [ ] T001 Create project structure per implementation plan with backend/ and frontend/ directories
- [ ] T002 Initialize backend with Express.js, GraphQL (Apollo Server), Prisma ORM, Puppeteer, Cheerio, node-cron dependencies
- [ ] T003 Initialize frontend with React, TypeScript, Vite, Apollo Client dependencies
- [ ] T004 [P] Configure linting and formatting tools (ESLint, Prettier) for both frontend and backend
- [ ] T005 Set up PostgreSQL database schema and Prisma migration files in database/ directory
- [ ] T006 Create environment configuration files (.env.example, docker-compose.yml)

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation (Test-Driven Development principle)**
- [ ] T007 [P] Contract test for events query in backend/tests/contract/test_events_query.ts
- [ ] T008 [P] Contract test for event query in backend/tests/contract/test_event_detail.ts
- [ ] T009 [P] Contract test for eventsReverseChronological query in backend/tests/contract/test_events_reverse_chronological.ts
- [ ] T010 [P] Contract test for eventsByDate query in backend/tests/contract/test_events_by_date.ts
- [ ] T011 [P] Contract test for eventsByCategory query in backend/tests/contract/test_events_by_category.ts
- [ ] T012 [P] Contract test for upcomingEvents query in backend/tests/contract/test_upcoming_events.ts
- [ ] T013 [P] Contract test for sourceWebsites query in backend/tests/contract/test_source_websites.ts
- [ ] T014 [P] Contract test for scrapingLogs query in backend/tests/contract/test_scraping_logs.ts
- [ ] T015 [P] Contract test for triggerScrape mutation in backend/tests/contract/test_trigger_scrape.ts
- [ ] T016 [P] Integration test for event scraping functionality in backend/tests/integration/test_scraping_service.ts
- [ ] T017 [P] Integration test for duplicate detection in backend/tests/integration/test_duplicate_detection.ts
- [ ] T018 [P] Integration test for event scheduling in backend/tests/integration/test_scheduled_scraping.ts
- [ ] T019 [P] Unit tests for all functions to achieve minimum 85% coverage

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T020 [P] Event model in backend/src/models/Event.ts
- [ ] T021 [P] SourceWebsite model in backend/src/models/SourceWebsite.ts
- [ ] T022 [P] ScrapingLog model in backend/src/models/ScrapingLog.ts
- [ ] T023 Event repository service in backend/src/services/EventRepository.ts
- [ ] T024 SourceWebsite repository service in backend/src/services/SourceWebsiteRepository.ts
- [ ] T025 ScrapingLog repository service in backend/src/services/ScrapingLogRepository.ts
- [ ] T026 Event scraping service in backend/src/services/ScrapingService.ts
- [ ] T027 Duplicate detection logic in backend/src/services/DuplicateDetectionService.ts
- [ ] T028 GraphQL schema definition matching contract in backend/schema.graphql
- [ ] T029 Event resolver in backend/src/resolvers/EventResolver.ts
- [ ] T030 SourceWebsite resolver in backend/src/resolvers/SourceWebsiteResolver.ts
- [ ] T031 ScrapingLog resolver in backend/src/resolvers/ScrapingLogResolver.ts
- [ ] T032 Scheduled scraping service in backend/src/services/ScheduledScrapingService.ts using node-cron
- [ ] T033 Event filtering and search functionality in backend/src/services/EventFilterService.ts
- [ ] T034 Frontend EventList component in frontend/src/components/EventList.tsx
- [ ] T035 Frontend EventDetail component in frontend/src/components/EventDetail.tsx
- [ ] T036 Frontend EventsReverseChronological page in frontend/src/pages/EventsReverseChronological.tsx
- [ ] T037 Frontend EventFilters component in frontend/src/components/EventFilters.tsx
- [ ] T038 Frontend GraphQL client setup in frontend/src/services/graphqlClient.ts
- [ ] T039 Frontend API service for events in frontend/src/services/EventService.ts
- [ ] T040 Frontend routing configuration in frontend/src/router.tsx

## Phase 3.4: Integration
- [ ] T041 Connect backend services to Prisma ORM in backend/src/database/
- [ ] T042 Apollo Server setup and GraphQL endpoint in backend/src/server.ts
- [ ] T043 Frontend Apollo Client integration with backend GraphQL API
- [ ] T044 Request/response logging middleware in backend/src/middleware/
- [ ] T045 CORS and security headers configuration
- [ ] T046 Database connection and migration setup
- [ ] T047 Scraping error handling and retry logic
- [ ] T048 Frontend-Backend communication for event data

## Phase 3.5: Polish
- [ ] T049 [P] Unit tests for scraper in backend/tests/unit/test_scraper.ts
- [ ] T050 [P] Unit tests for duplicate detection in backend/tests/unit/test_duplicate_detection.ts
- [ ] T051 Performance tests to ensure <500ms response times
- [ ] T052 [P] Update docs/api.md with API endpoints documentation
- [ ] T053 [P] Update docs/data-model.md with implementation details
- [ ] T054 [P] Update docs/quickstart.md with deployment instructions
- [ ] T055 Remove duplication to maintain code quality standards
- [ ] T056 Run manual-testing.md verification steps
- [ ] T057 Code quality checks with linters and static analysis tools
- [ ] T058 Frontend responsive design and accessibility improvements
- [ ] T059 Database cleanup service for old events

## Dependencies
- Tests (T007-T019) before implementation (T020-T040)
- T020, T021, T022 blocks T023, T024, T025, T026
- T023, T024, T025 blocks T029, T030, T031
- T029, T030, T031 blocks T042
- T042 blocks T043
- T038, T039 blocks frontend components (T034-T040)
- Implementation before polish (T049-T059)

## Parallel Example
```
# Launch T007-T015 together (contract tests):
Task: "Contract test for events query in backend/tests/contract/test_events_query.ts"
Task: "Contract test for event query in backend/tests/contract/test_event_detail.ts"
Task: "Contract test for eventsReverseChronological query in backend/tests/contract/test_events_reverse_chronological.ts"
Task: "Contract test for eventsByDate query in backend/tests/contract/test_events_by_date.ts"
Task: "Contract test for eventsByCategory query in backend/tests/contract/test_events_by_category.ts"
Task: "Contract test for upcomingEvents query in backend/tests/contract/test_upcoming_events.ts"
Task: "Contract test for sourceWebsites query in backend/tests/contract/test_source_websites.ts"
Task: "Contract test for scrapingLogs query in backend/tests/contract/test_scraping_logs.ts"
Task: "Contract test for triggerScrape mutation in backend/tests/contract/test_trigger_scrape.ts"

# Launch T020-T022 together (models):
Task: "Event model in backend/src/models/Event.ts"
Task: "SourceWebsite model in backend/src/models/SourceWebsite.ts"
Task: "ScrapingLog model in backend/src/models/ScrapingLog.ts"

# Launch T034-T037 together (frontend components):
Task: "Frontend EventList component in frontend/src/components/EventList.tsx"
Task: "Frontend EventDetail component in frontend/src/components/EventDetail.tsx"
Task: "Frontend EventsReverseChronological page in frontend/src/pages/EventsReverseChronological.tsx"
Task: "Frontend EventFilters component in frontend/src/components/EventFilters.tsx"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Each contract file → contract test task [P]
   - Each endpoint → implementation task
   
2. **From Data Model**:
   - Each entity → model creation task [P]
   - Relationships → service layer tasks
   
3. **From User Stories**:
   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Tests → Models → Services → Endpoints → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [ ] All contracts have corresponding tests
- [ ] All entities have model tasks
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task