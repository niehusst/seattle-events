import { FC } from 'react';
import { EventService } from '../services/EventService';
import EventList from '../components/EventList';

const EventsReverseChronological: FC = () => {
  const { loading, error, data } = EventService.useReverseChronologicalEvents(20, 0);

  return (
    <div className="events-reverse-chronological-page">
      <h1>Events in Reverse Chronological Order</h1>
      
      <EventList 
        events={data?.eventsReverseChronological || []} 
        loading={loading}
        error={error?.message}
      />
    </div>
  );
};

export default EventsReverseChronological;