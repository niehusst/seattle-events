import { FC } from 'react';
import { IEvent } from '../services/EventService';
import EventCard from './EventCard'; // Assuming we have an EventCard component

interface EventListProps {
  events: IEvent[];
  loading?: boolean;
  error?: string;
}

const EventList: FC<EventListProps> = ({ events, loading, error }) => {
  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="event-list">
      <h2>Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;