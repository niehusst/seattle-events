-- This script should be run to set up the initial database schema
-- It's based on the Prisma schema defined in database/schema.prisma

-- The tables will be created by Prisma migrations, which are run using:
-- npx prisma migrate dev

-- After the initial migration, we'll also want to populate with some initial source websites
-- These are the sites we'll be scraping based on the specification

-- Insert default source websites to scrape
INSERT INTO "SourceWebsite" (
    "id",
    "url",
    "name",
    "is_active",
    "created_at",
    "updated_at"
) VALUES
(
    '1',
    'https://grad.uw.edu/public-lecture-series/',
    'UW Public Lecture Series',
    true,
    NOW(),
    NOW()
),
(
    '2',
    'https://www.events12.com/seattle/',
    'Events12 Seattle',
    true,
    NOW(),
    NOW()
),
(
    '3',
    'https://visitseattle.org/?s=&frm=events&event_begin=&event_type=visual-arts-galleries',
    'Visit Seattle - Visual Arts',
    true,
    NOW(),
    NOW()
),
(
    '4',
    'https://visitseattle.org/?s=&frm=events&event_begin=&event_type=theatre',
    'Visit Seattle - Theatre',
    true,
    NOW(),
    NOW()
),
(
    '5',
    'https://visitseattle.org/?s=&frm=events&event_begin=&event_type=readings-lectures',
    'Visit Seattle - Readings & Lectures',
    true,
    NOW(),
    NOW()
),
(
    '6',
    'https://visitseattle.org/?s=&frm=events&event_begin=&event_type=museums',
    'Visit Seattle - Museums',
    true,
    NOW(),
    NOW()
),
(
    '7',
    'https://visitseattle.org/?s=&frm=events&event_begin=&event_type=history-heritage',
    'Visit Seattle - History & Heritage',
    true,
    NOW(),
    NOW()
),
(
    '8',
    'https://visitseattle.org/?s=&frm=events&event_begin=&event_type=film-media-arts',
    'Visit Seattle - Film & Media Arts',
    true,
    NOW(),
    NOW()
),
(
    '9',
    'https://visitseattle.org/?s=&frm=events&event_begin=&event_type=festivals-special-events',
    'Visit Seattle - Festivals & Special Events',
    true,
    NOW(),
    NOW()
);