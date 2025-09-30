import { render, screen, waitFor, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import App from '../App';
import EventDetail from '../components/EventDetail';
import { GET_EVENTS, GET_EVENT } from '../services/EventService';

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

const mockSingleEvent = {
  id: '1',
  title: 'Test Event 1',
  description: 'This is a test event 1',
  startDate: '2023-06-15T10:00:00Z',
  endDate: '2023-06-15T12:00:00Z',
  locationName: 'Test Location 1',
  streetAddress: '123 Main St',
  city: 'Seattle',
  state: 'WA',
  zipCode: '98101',
  latitude: 47.6062,
  longitude: -122.3321,
  imageUrl: 'https://example.com/image1.jpg',
  category: 'Concert',
  price: 'Free',
  organizer: 'Test Organizer',
  contactInfo: 'contact@example.com',
  sourceWebsite: 'example.com',
  eventUrl: 'https://example.com/event/1',
  createdAt: '2023-05-01T10:00:00Z',
  updatedAt: '2023-05-01T10:00:00Z',
  scrapedAt: '2023-05-01T10:00:00Z',
  __typename: 'Event',
};

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
  {
    request: {
      query: GET_EVENT,
      variables: {
        id: '1',
      },
    },
    result: {
      data: {
        event: mockSingleEvent,
      },
    },
  },
];

describe('Event Listing and Detail Navigation', () => {
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

  it('navigates to detail page on click and displays event details', async () => {
    // For this test, we need to use the proper routes configuration as in the app
    // The EventDetail is a child route of App in the router configuration

    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </MockedProvider>
    );

    // Wait for the event detail to load
    await waitFor(() => {
      // Using a more flexible text matcher since the text is split across multiple elements
      screen.getByText(/Test Event 1/).click();
    });

    // Verify that event details are displayed
    expect(screen.getByText(/Test Event 1/)).toBeInTheDocument();
    expect(screen.getByText(/This is a test event 1/)).toBeInTheDocument();
    expect(screen.getByText(/Test Location 1/)).toBeInTheDocument();
    expect(screen.getByText(/123 Main St/)).toBeInTheDocument();
    expect(screen.getByText(/Seattle, WA 98101/)).toBeInTheDocument();
    expect(screen.getByText(/Category: Concert/)).toBeInTheDocument();
    expect(screen.getByText(/Price: Free/)).toBeInTheDocument();
    expect(screen.getByText(/Organizer: Test Organizer/)).toBeInTheDocument();
    expect(screen.getByText(/Contact: contact@example.com/)).toBeInTheDocument();

    // Verify that the "View on Source Website" button is present with correct URL
    const viewButton = screen.getByRole('link', { name: /View on Source Website/ });
    expect(viewButton).toHaveAttribute('href', 'https://example.com/event/1');
  });
});
