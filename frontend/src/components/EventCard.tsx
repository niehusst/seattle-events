import React from 'react';
import { IEvent } from '../services/EventService';
import { Link } from 'react-router-dom';

interface EventCardProps {
  event: IEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="event-card">
      <Link to={`/event/${event.id}`} className="event-link">
        <h3>{event.title}</h3>
        {event.imageUrl && <img src={event.imageUrl} alt={event.title} className="event-image" />}
        <p className="event-date">{formatDate(event.startDate)}</p>
        {event.locationName && <p className="event-location">{event.locationName}</p>}
        {event.description && (
          <p className="event-description">
            {event.description.length > 150 
              ? `${event.description.substring(0, 150)}...` 
              : event.description}
          </p>
        )}
        <div className="event-meta">
          <span className="event-category">{event.category}</span>
          <span className="event-source">Source: {event.sourceWebsite}</span>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;