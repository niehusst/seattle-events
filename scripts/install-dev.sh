#!/bin/bash

# Seattle Events Development Setup Script
# This script installs all requirements needed for local development

set -e # Exit on any error

echo "Seattle Events Development Setup"
echo "==============================="

# Check if Node.js is installed
if ! command -v node &>/dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js 18+ before running this script."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2)
NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1)

if [ "$NODE_MAJOR" -lt 18 ]; then
    echo "Error: Node.js version 18+ is required. Current version: $NODE_VERSION"
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &>/dev/null; then
    echo "Warning: PostgreSQL is not installed or not in PATH."
    echo "Please install PostgreSQL 12+ before continuing."
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Create backend .env file if it doesn't exist
if [ ! -f ./backend/.env ]; then
    echo "Creating backend .env file from sample..."
    cp ./backend/.env.sample ./backend/.env
    echo "Please update backend/.env with your specific configuration."
fi

# Create frontend .env file if it doesn't exist
if [ ! -f ./frontend/.env ]; then
    echo "Creating frontend .env file from sample..."
    cp ./frontend/.env.sample ./frontend/.env
    echo "Please update frontend/.env with your specific configuration."
fi

echo "Installing backend dependencies.."
cd ./backend
npm install
cd ..

echo "Installing frontend dependencies.."
cd ./frontend
npm install
cd ..

echo "Setting up Prisma.."
cd ./backend
npx prisma generate --schema=../database/schema.prisma
cd ..

echo "Installation complete!"
echo ""
echo "To start the system, run: ./run-dev.sh or 'make run' from project root"
echo ""
echo "Additional setup steps:"
echo "- Make sure PostgreSQL is running"
echo "- Run database migrations with: 'make db-migrate'"
echo "- If needed, update environment variables in the .env file"
