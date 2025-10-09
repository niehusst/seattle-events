# API Documentation

This document describes the GraphQL API endpoints available in the Seattle Events Web Application.

## Base URL
- Development: `http://localhost:4000/graphql`
- Production: `<production-url>/graphql`

## Queries

### events
Get all events with optional filtering and pagination.

```graphql
query GetEvents($filter: EventFilterInput, $dateRange: DateTimeFilterInput, $limit: Int, $offset: Int) {
  events(filter: $filter, dateRange: $dateRange, limit: $limit, offset: $offset) {
    id
    title
    description
    startDate
    endDate
    locationName
    streetAddress
    city
    state
    zipCode
    latitude
    longitude
    eventUrl
    imageUrl
    category
    price
    organizer
    contactInfo
    createdAt
    updatedAt
    scrapedAt
  }
}
```

**Arguments:**
- `filter` (EventFilterInput): Filter by category, location, etc.
- `dateRange` (DateTimeFilterInput): Filter by date range
- `limit` (Int): Number of events to return (default: 20)
- `offset` (Int): Number of events to skip (default: 0)

### event
Get a single event by ID.

```graphql
query GetEvent($id: ID!) {
  event(id: $id) {
    # ... same fields as above
  }
}
```

**Arguments:**
- `id` (ID!): The ID of the event to retrieve


### sourceWebsites
Get all configured source websites.

```graphql
query GetSourceWebsites {
  sourceWebsites {
    id
    url
    name
    isActive
    lastScrapedAt
    createdAt
    updatedAt
    scrapingConfig
  }
}
```



## Types

### Event
Represents an event scraped from a website.

- `id`: Unique identifier
- `title`: The event title
- `description`: Detailed description of the event
- `startDate`: The start date and time of the event
- `endDate`: The end date and time of the event (optional)
- `locationName`: Name of the venue/location
- `streetAddress`: Street address of the event
- `city`: City where the event takes place
- `state`: State where the event takes place
- `zipCode`: ZIP code of the event location
- `latitude`: Geographic latitude coordinate (optional)
- `longitude`: Geographic longitude coordinate (optional)
- `eventUrl`: Original URL where the event was found
- `imageUrl`: URL to an image associated with the event (optional)
- `category`: Category of the event (optional)
- `price`: Cost of attending the event (optional)
- `organizer`: Name of the event organizer (optional)
- `contactInfo`: Contact information for the event (optional)
- `createdAt`: Timestamp when the event was added to the database
- `updatedAt`: Timestamp when the event was last updated
- `scrapedAt`: Timestamp when the event was last scraped (optional)

### SourceWebsite
Represents a website configured for scraping.

- `id`: Unique identifier
- `url`: The base URL of the website to scrape
- `name`: A human-readable name for the website
- `isActive`: Whether the scraper should include this website
- `lastScrapedAt`: Timestamp of the last successful scrape (optional)
- `createdAt`: Timestamp when the source was added
- `updatedAt`: Timestamp when the source was last updated
- `scrapingConfig`: Configuration for how to scrape this particular website (optional)


## Scalars

### DateTime
Represents a date and time in ISO 8601 format.

### Date
Represents a date in ISO 8601 format (YYYY-MM-DD).