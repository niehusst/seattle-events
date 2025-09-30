#!/bin/bash

# Seattle Events Development Run Script
# This script runs all system components for local development

set -e # Exit on any error

echo "Seattle Events Development Runner"
echo "==============================="

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "Port $port is already in use. Please stop the process using this port first."
        exit 1
    fi
}

# Check required ports
check_port 4000 # Backend GraphQL server
check_port 3000 # Frontend server

# Check if backend .env file exists
if [ ! -f ./backend/.env ]; then
    echo "Error: backend/.env file not found. Please run install-dev.sh first."
    exit 1
fi

# Check if frontend .env file exists
if [ ! -f ./frontend/.env ]; then
    echo "Error: frontend/.env file not found. Please run install-dev.sh first."
    exit 1
fi

# Function to run backend
run_backend() {
    echo "Starting backend server..."
    cd ./backend

    # Source backend environment variables (for database URL, server port, etc.)
    source .env

    # Run database migrations first
    echo "Running database migrations..."
    npm run prisma:migrate

    # Start the backend server
    npm run dev &
    BACKEND_PID=$!
    cd ..
}

# Function to run frontend
run_frontend() {
    echo "Starting frontend server..."
    cd ./frontend
    source .env
    npm run dev &
    FRONTEND_PID=$!
    cd ..
}

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Stopping servers..."
    [ ! -z "$BACKEND_PID" ] && kill $BACKEND_PID 2>/dev/null || true
    [ ! -z "$FRONTEND_PID" ] && kill $FRONTEND_PID 2>/dev/null || true
    echo "Servers stopped. Goodbye!"
}

# Setup cleanup trap
trap cleanup EXIT

# Run backend and frontend in parallel
run_backend
sleep 3 # Wait a bit for backend to start
run_frontend

echo ""
echo "Seattle Events is now running!"
echo "Frontend: http://localhost:3000"
echo "Backend (GraphQL): http://localhost:4000/graphql"
echo ""
echo "Press Ctrl+C to stop the servers"
echo ""

# Wait for both processes to finish
wait $BACKEND_PID $FRONTEND_PID
