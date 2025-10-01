import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import App from '../App';
import { GET_EVENTS } from '../services/EventService';

// Mock data for testing
const mockEvents = [
  {
    id: '1',
    title: 'Test Event 1',
    description: 'This is a test event 1',
    startDate: '2023-06-15T10:00:00Z',
    endDate: '2023-06-15T12:00:00Z',
    locationName: 'Test Location 1',
    imageUrl: 'https://example.com/image1.jpg',
    category: 'Concert',
    sourceWebsite: 'example.com',
    eventUrl: 'https://example.com/event/1',
    __typename: 'Event',
  },
  {
    id: '2',
    title: 'Test Event 2',
    description: 'This is a test event 2',
    startDate: '2023-06-20T14:00:00Z',
    endDate: '2023-06-20T16:00:00Z',
    locationName: 'Test Location 2',
    imageUrl: 'https://example.com/image2.jpg',
    category: 'Workshop',
    sourceWebsite: 'example.com',
    eventUrl: 'https://example.com/event/2',
    __typename: 'Event',
  },
];

// Mock GraphQL responses
const mocks = [
  {
    request: {
      query: GET_EVENTS,
      variables: {
        filter: {},
        limit: 20,
        offset: 0,
      },
    },
    result: {
      data: {
        events: mockEvents,
      },
    },
  },
];

describe('Event Listing', () => {
  it('renders events list on root path', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </MockedProvider>
    );

    // Wait for the events to load
    await waitFor(() => {
      expect(screen.getByText('Test Event 1')).toBeInTheDocument();
      expect(screen.getByText('Test Event 2')).toBeInTheDocument();
    });

    // Verify that both events are displayed
    expect(screen.getByText('Test Event 1')).toBeInTheDocument();
    expect(screen.getByText('Test Event 2')).toBeInTheDocument();

    // Verify that event details are shown
    expect(screen.getByText('Test Location 1')).toBeInTheDocument();
    expect(screen.getByText('Test Location 2')).toBeInTheDocument();

    // Verify that navigation links are present - using more specific matching
    const eventLinks = screen.getAllByRole('link');
    const event1Link = eventLinks.find((link) => link.getAttribute('href') === '/event/1');
    const event2Link = eventLinks.find((link) => link.getAttribute('href') === '/event/2');

    expect(event1Link).toBeInTheDocument();
    expect(event2Link).toBeInTheDocument();
  });
});
