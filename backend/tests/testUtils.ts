import { expect } from '@jest/globals'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from '../src/schema';
import { resolvers } from '../src/resolvers';
import { PrismaClient } from '@prisma/client';
import { IEvent, IEventPartial } from '../src/models/Event';

export const prisma = new PrismaClient();

export const startTestServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 0 }, // Use random available port
  });

  return { server, url };
};

export async function seedEvent(event?: IEventPartial): Promise<IEvent> {
    if (!event) {
      const sourceWebsite = await prisma.sourceWebsite.create({
        data: {
    url: 'https://visitseattle.org/',
    name: 'Visit Seattle',
    isActive: true,
  }
      })

      event = {
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
        sourceWebsiteId: sourceWebsite.id,
      }
    }
    const createdEvent = await prisma.event.create({
      data: event,
    });

    return createdEvent as IEvent;
}

export function objectMatch(expected: any, actual: any) {
  if (typeof expected === 'object') {
    Object.keys(expected).every(key => {
      if (typeof expected[key] === 'object') {
        objectMatch(expected[key], actual[key])
      } else {
        expect(actual[key]).toBe(expected[key])
      }
    })
  } else {
    expect(actual).toBe(expected)
  }
}