# Seattle Events Makefile
# Contains targets for common development tasks

.PHONY: help install run clean lint db-migrate db-reset db-seed db-full-reset db-gen-schema

SHELL := /bin/bash

help:
	@echo "Seattle Events Development Makefile"
	@echo "===================================="
	@echo "Available targets:"
	@echo "  help           - Show this help message"
	@echo "  install        - Install all dependencies for development"
	@echo "  run            - Run all system components for development"
	@echo "  clean          - Clean build artifacts and node_modules"
	@echo "  lint           - Lint all projects"
	@echo "  db-migrate     - Run database migrations"
	@echo "  db-gen-schema  - Generate db schema for prisma client"
	@echo "  db-reset      	- Reset database to initial state"
	@echo "  db-seed       	- Seed database with sample data for testing"
	@echo "  db-full-reset  - Drop and recreate database and user from .env"

install:
	@echo "Installing development dependencies..."
	@./scripts/install-dev.sh

run:
	@echo "Running Seattle Events system..."
	@./scripts/run-dev.sh

clean:
	@echo "Cleaning build artifacts..."
	@rm -rf backend/dist
	@rm -rf frontend/dist
	@echo "Removing node_modules to save space..."
	@rm -rf backend/node_modules
	@rm -rf frontend/node_modules
	@echo "Clean complete. Run 'make install' to reinstall dependencies."

lint:
	@echo "Running linting..."
	@cd backend && npm run lint
	@cd frontend && npm run lint
	@echo "Linting completed."

db-migrate:
	@echo "Running database migrations..."
	@cd backend && npm run prisma:migrate
	@echo "Database migrations completed."

db-reset:
	@echo "Resetting database to initial state..."
	@cd backend && npx prisma migrate reset --schema=./database/schema.prisma
	@echo "Database reset completed."

db-seed:
	@echo "Seeding database with sample data..."
	@cd backend/ && ./scripts/seed-db.cjs
	@echo "Database seeding completed."

db-full-reset:
	@echo "Dropping and recreating database and user..."
	@./scripts/reset-db.sh
	@echo "Database and user reset completed. Run 'make db-migrate' to set up tables."

db-gen-schema:
	@echo "Setting up Prisma..."
	@cd backend && npm run prisma:generate
	@echo "Prisma schema generated."
