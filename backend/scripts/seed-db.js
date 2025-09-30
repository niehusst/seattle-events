#!/usr/bin/env node

// Seattle Events Database Seeding Script
// This script populates the database with dummy event data for testing

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Sample events data for testing
const sampleEvents = [
  {
    title: 'Seattle Tech Conference 2023',
    description:
      'Annual technology conference featuring talks on the latest trends in software development.',
    startDate: new Date('2024-10-15T09:00:00Z'),
    endDate: new Date('2024-10-15T17:00:00Z'),
    locationName: 'Seattle Convention Center',
    streetAddress: '705 Pike St',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    latitude: 47.6113,
    longitude: -122.3375,
    eventUrl: 'https://example.com/tech-conference',
    imageUrl: 'https://example.com/images/tech-conference.jpg',
    category: 'Technology',
    price: '$199 - $299',
    organizer: 'Tech Seattle',
    sourceWebsite: 'https://events.example.com',
  },
  {
    title: 'Fremont Fair',
    description:
      'Annual community festival celebrating the Fremont neighborhood with art, music, and food.',
    startDate: new Date('2024-08-30T10:00:00Z'),
    endDate: new Date('2024-08-31T18:00:00Z'),
    locationName: 'Fremont Troll Area',
    streetAddress: 'N 34th St',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98103',
    latitude: 47.6507,
    longitude: -122.3491,
    eventUrl: 'https://example.com/fremont-fair',
    category: 'Festival',
    sourceWebsite: 'https://events.example.com',
  },
  {
    title: 'Pike Place Market Tour',
    description:
      "Guided tour of Seattle's historic Pike Place Market with food tastings and local stories.",
    startDate: new Date('2024-10-20T10:00:00Z'),
    endDate: new Date('2024-10-20T12:00:00Z'),
    locationName: 'Pike Place Market',
    streetAddress: '85 Pike St',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    latitude: 47.6087,
    longitude: -122.3401,
    eventUrl: 'https://example.com/pike-place-tour',
    category: 'Tour',
    sourceWebsite: 'https://events.example.com',
  },
  {
    title: "Seattle Symphony: Beethoven's Symphony No. 9",
    description: 'Experience the powerful and emotional Symphony No. 9 by Ludwig van Beethoven.',
    startDate: new Date('2024-11-05T19:30:00Z'),
    endDate: new Date('2024-11-05T21:30:00Z'),
    locationName: 'Benaroya Hall',
    streetAddress: '200 University St',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    latitude: 47.6097,
    longitude: -122.3331,
    eventUrl: 'https://example.com/symphony-beethoven',
    category: 'Music',
    price: '$35 - $95',
    sourceWebsite: 'https://events.example.com',
  },
  {
    title: 'Coffee & Code Meetup',
    description:
      'Monthly meetup for developers to network, share knowledge, and discuss the latest in programming.',
    startDate: new Date('2024-10-18T18:00:00Z'),
    endDate: new Date('2024-10-18T20:00:00Z'),
    locationName: 'Starbucks Reserve Roastery',
    streetAddress: '1124 Pike St',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    latitude: 47.6082,
    longitude: -122.3355,
    eventUrl: 'https://example.com/coffee-code-meetup',
    category: 'Meetup',
    sourceWebsite: 'https://events.example.com',
  },
];

// Source websites data
const sourceWebsites = [
  {
    url: 'https://visitseattle.org/',
    name: 'Visit Seattle',
    isActive: true,
  },
  {
    url: 'https://events12.com/seattle/',
    name: 'Events12 Seattle',
    isActive: true,
  },
  {
    url: 'https://grad.uw.edu/public-lecture-series/',
    name: 'UW Public Lecture Series',
    isActive: true,
  },
];

async function main() {
  console.log('Seeding database with sample data...');

  // Clear existing data (optional - comment out if you don't want to clear)
  console.log('Clearing existing data...');
  await prisma.event.deleteMany({});
  await prisma.sourceWebsite.deleteMany({});
  await prisma.scrapingLog.deleteMany({});

  // Create source websites
  console.log('Creating source websites...');
  for (const website of sourceWebsites) {
    await prisma.sourceWebsite.create({
      data: website,
    });
  }

  // Create events
  console.log('Creating sample events...');
  for (const event of sampleEvents) {
    await prisma.event.create({
      data: event,
    });
  }

  console.log('Database seeded successfully!');
  console.log(
    `Created ${sampleEvents.length} events and ${sourceWebsites.length} source websites.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
