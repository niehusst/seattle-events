
# Implementation Plan: Seattle Events Web Application

**Branch**: `001-build-a-web` | **Date**: Monday, September 29, 2025 | **Spec**: [link]
**Input**: Feature specification from `/specs/001-build-a-web/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from file system structure or context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code or `AGENTS.md` for opencode).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Build a web application that scrapes Seattle events from various websites on a daily schedule and stores them in a PostgreSQL database without duplicates. The UI displays events in reverse-chronological order with detail pages. The application uses TypeScript with React/Vite frontend and Express.js/GraphQL backend, with performance goals of under 500ms response times. Public access without authentication required.

## Technical Context
**Language/Version**: Typescript with Vite and React for client, express.js and GraphQL on the server
**Primary Dependencies**: Vite, React, Express.js, GraphQL, Apollo Client/Server, PostgreSQL driver
**Storage**: PostgreSQL database for event data
**Testing**: Jest for unit tests, React Testing Library for UI tests, Supertest for API tests
**Target Platform**: Web application (client-server architecture)
**Project Type**: Web application with frontend (React) and backend (Express/GraphQL)
**Performance Goals**: Under 500ms response times for all pages (per spec clarification)
**Constraints**: Daily scheduled scraping, prevent duplicate events, public access (no auth required)
**Scale/Scope**: Seattle events web application with reverse-chronological display

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Code Quality Standards**: All code must adhere to established style guides and pass static analysis
**Test-Driven Development**: All features must start with test creation before implementation (minimum 85% coverage)
**Performance Requirements**: All features must meet performance benchmarks before acceptance
**Comprehensive Test Coverage**: All functions require unit tests, service interactions need integration tests
**Quality Assurance Pipeline**: All changes require peer code reviews and automated quality gates

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
backend/
├── src/
│   ├── models/
│   ├── services/
│   ├── api/
│   └── scraper/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── contract/
├── package.json
└── schema.graphql

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── types/
├── tests/
│   ├── unit/
│   └── integration/
├── package.json
└── vite.config.ts

database/
├── migrations/
├── seeds/
└── schema.sql

package.json
tsconfig.json
docker-compose.yml
.env.example
```

**Structure Decision**: Web application with separate frontend and backend services, following the identified project type. The backend handles GraphQL API and event scraping while the frontend provides React-based UI. Shared database layer with PostgreSQL migrations and seeds.

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For the event scraping requirement:
     Task: "Research best practices for web scraping in TypeScript/Node.js"
   For PostgreSQL integration:
     Task: "Find best practices for PostgreSQL with TypeScript and GraphQL"
   For web scraping scheduler:
     Task: "Research cron job implementations for Node.js event scheduling"
   For duplicate detection:
     Task: "Research techniques for detecting duplicate events in PostgreSQL"
   For GraphQL API design:
     Task: "Find best practices for GraphQL API design with event data"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - GraphQL schema for event queries and any mutations
   - Standard GraphQL patterns for the event data
   - Output GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per GraphQL resolver
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/bash/update-agent-context.sh qwen`
     **IMPORTANT**: Execute it exactly as specified above. Do not add or remove any arguments.
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Each GraphQL contract → contract test task [P]
- Each event entity → database model and type creation task [P]
- Each user story → integration test task
- Implementation tasks to make tests pass
- Scraping service implementation tasks
- Frontend page and component creation tasks

**Ordering Strategy**:
- TDD order: Tests before implementation 
- Dependency order: Database models before services before API before UI
- Mark [P] for parallel execution (independent files)

**Estimated Output**: 25-30 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*
