# Data Model Documentation

This document describes the data models used in the Seattle Events Web Application.

## Event

The primary entity for storing event information scraped from various websites.

### Fields
- **id** (String, Primary Key): Unique identifier for the event, auto-generated
- **title** (String, Required): The name/title of the event
- **description** (String, Optional): Detailed description of the event
- **startDate** (DateTime, Required): The start date and time of the event
- **endDate** (DateTime, Optional): The end date and time of the event (if applicable)
- **locationName** (String, Optional): Name of the venue/location
- **streetAddress** (String, Optional): Street address of the event
- **city** (String, Optional): City where the event takes place
- **state** (String, Optional): State where the event takes place
- **zipCode** (String, Optional): ZIP code of the event location
- **latitude** (Float, Optional): Geographic latitude coordinate
- **longitude** (Float, Optional): Geographic longitude coordinate
- **eventUrl** (String, Required): Original URL where the event was found
- **imageUrl** (String, Optional): URL to an image associated with the event
- **category** (String, Optional): Category or type of the event (e.g., concert, workshop, festival)
- **price** (String, Optional): Cost of attending the event
- **organizer** (String, Optional): Name of the event organizer
- **contactInfo** (String, Optional): Contact information for the event
- **sourceWebsite** (String, Required): The website where the event was scraped from
- **createdAt** (DateTime): Timestamp when the event was added to the database
- **updatedAt** (DateTime): Timestamp when the event was last updated
- **scrapedAt** (DateTime): Timestamp when the event was last scraped

### Validation Rules
- startDate must be before endDate if endDate is provided
- title must not be empty
- eventUrl must be a valid URL format
- startDate must be in the future (for events that haven't occurred yet)
- A composite unique constraint exists on (title, startDate, locationName) to prevent duplicates

### Relationships
- None (Event is a standalone entity)

## SourceWebsite

An entity to track the websites being scraped for event information.

### Fields
- **id** (String, Primary Key): Unique identifier for the source website
- **url** (String, Required): The base URL of the website to scrape
- **name** (String, Required): A human-readable name for the website
- **isActive** (Boolean): Whether the scraper should include this website
- **lastScrapedAt** (DateTime, Optional): Timestamp of the last successful scrape
- **createdAt** (DateTime): Timestamp when the source was added
- **updatedAt** (DateTime): Timestamp when the source was last updated
- **scrapingConfig** (Json, Optional): Configuration for how to scrape this particular website (selectors, patterns, etc.)

### Validation Rules
- URL must be a valid format
- Name must not be empty
- URL must be unique

### Relationships
- One-to-many with Event (one source website can have many events)


## Implementation Notes

### Database Schema
The database schema is defined using Prisma ORM and can be found in `database/schema.prisma`.

### Indexes
- A composite unique index on Event (title, startDate, locationName) to prevent duplicates
- Standard indexes on foreign keys and commonly queried fields

### Constraints
- Database-level constraints prevent duplicate events based on title, date, and location
- Foreign key constraints maintain referential integrity
- Check constraints on status fields to ensure valid values

### Data Lifecycle
Events that have already occurred may be automatically cleaned up based on the application's retention policy.