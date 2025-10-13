# Quickstart Guide: Seattle Events Web Application

## Prerequisites
- Node.js 18+ installed
- PostgreSQL 12+ installed and running
- Docker and Docker Compose (optional, for containerized setup)

## Setup Instructions

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd seattle-events
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 2. Database Setup
```bash
# Create .env file from example
cp .env.example .env

# Update database connection details in .env
# DATABASE_URL="postgresql://username:password@localhost:5432/seattle_events"

# Run database migrations
cd backend
npx prisma migrate dev
```

### 3. Environment Configuration
Update the `.env` file with appropriate values:
- Database connection string
- Port numbers for frontend and backend
- Scraping configuration
- Any API keys if required

### 4. Start the Application
```bash
# Terminal 1: Start the backend server
cd backend
npm run dev

# Terminal 2: Start the frontend server
cd frontend
npm run dev
```

## Verification Steps

### 1. Verify Backend API
1. Navigate to `http://localhost:4000/graphql` (or your configured port)
2. Execute the following query to confirm API is working:
```graphql
query {
  events(limit: 1) {
    id
    title
    startDate
  }
}
```

### 2. Verify Frontend
1. Open `http://localhost:3000` in a web browser
2. Confirm the events list page loads without errors
3. Verify you can navigate to an individual event detail page

### 3. Verify Scraping Functionality
1. Check that the daily scraping job is configured
2. Wait for scheduled scraping to complete
3. Verify new events appear in the database and UI

### 4. Full User Flow Test
1. Visit the main events page
2. Verify events are displayed correctly
3. Click on an event to view its details
4. Confirm all event information is displayed correctly

## Deployment Instructions

### Docker Deployment
```bash
# Build and start all services with Docker Compose
docker-compose up --build

# The application will be available at:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:4000/graphql
# - PostgreSQL: localhost:5432
```

### Production Deployment
1. Set environment variables for production
2. Build the frontend application:
   ```bash
   cd frontend && npm run build
   ```
3. Build the backend application:
   ```bash
   cd backend && npm run build
   ```
4. Run the production server:
   ```bash
   cd backend && npm start
   ```

## Troubleshooting
- If database migrations fail, ensure PostgreSQL is running and credentials are correct
- If scraping doesn't work, check that the source websites are accessible and scraping configuration is correct
- If frontend can't connect to backend, verify CORS settings and API endpoints