#!/bin/bash

# Seattle Events Database Reset Script
# This script drops and recreates the database and user based on .env settings

set -e # Exit on any error

echo "Seattle Events Database Reset Script"
echo "==================================="

# Check if backend .env file exists
if [ ! -f ./backend/.env ]; then
    echo "Error: backend/.env file not found. Please run this script from the root directory."
    exit 1
fi

# Source environment variables from backend .env file
source ./backend/.env

# Check if required environment variables are set
if [ -z "$DB_NAME" ] || [ -z "$DB_USER" ] || [ -z "$DB_PASS" ]; then
    echo "Error: DB_NAME, DB_USER, or DB_PASS not found in .env file"
    echo "Please ensure these variables are defined in your .env file"
    exit 1
fi

echo "Using database: $DB_NAME"
echo "Using user: $DB_USER"

# Check if PostgreSQL is running
if ! command -v psql &>/dev/null; then
    echo "Error: PostgreSQL is not installed or not in PATH"
    exit 1
fi

# Check if we can connect to PostgreSQL as superuser
if ! psql -U postgres -c "SELECT 1;" >/dev/null 2>&1; then
    echo "Error: Cannot connect to PostgreSQL as postgres user"
    echo "Make sure PostgreSQL is running and you have superuser access"
    exit 1
fi

# Drop the database if it exists
echo "Dropping database '$DB_NAME' if it exists..."
psql -U postgres -c "DROP DATABASE IF EXISTS \"$DB_NAME\";" >/dev/null 2>&1 || {
    echo "Warning: Failed to drop database (may not exist)"
}

# Drop the user if it exists
echo "Dropping user '$DB_USER' if it exists..."
psql -U postgres -c "DROP USER IF EXISTS \"$DB_USER\";" >/dev/null 2>&1 || {
    echo "Warning: Failed to drop user (may not exist)"
}

# Create the user
echo "Creating user '$DB_USER'..."
psql -U postgres -c "CREATE USER \"$DB_USER\" WITH PASSWORD '$DB_PASS';" >/dev/null 2>&1 || {
    echo "Error: Failed to create user '$DB_USER'"
    exit 1
}

# Grant privileges to the user
psql -U postgres -c "ALTER USER \"$DB_USER\" CREATEDB;" >/dev/null 2>&1 || {
    echo "Error: Failed to grant CREATEDB privilege to user '$DB_USER'"
    exit 1
}

# Create the database
echo "Creating database '$DB_NAME'..."
psql -U postgres -c "CREATE DATABASE \"$DB_NAME\" WITH OWNER \"$DB_USER\";" >/dev/null 2>&1 || {
    echo "Error: Failed to create database '$DB_NAME'"
    exit 1
}

# Grant privileges on the database to the user
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE \"$DB_NAME\" TO \"$DB_USER\";" >/dev/null 2>&1 || {
    echo "Error: Failed to grant privileges on database"
    exit 1
}

echo "Database and user successfully created!"
echo "Database: $DB_NAME"
echo "User: $DB_USER"
echo ""
echo "Next steps:"
echo "- Run database migrations with: make db-migrate"
echo "- Seed with test data (optional) with: make db-seed"
