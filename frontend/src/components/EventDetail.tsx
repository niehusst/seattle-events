import React from 'react';
import { useParams } from 'react-router-dom';
import { useEvent } from '../services/EventService';
import { IEvent } from '../services/EventService';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useEvent(id!);

  if (loading) return <div>Loading event...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const event: IEvent = data?.event;

  if (!event) {
    return <div>Event not found</div>;
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="event-detail">
      <div className="event-header">
        <h1>{event.title}</h1>
        {event.imageUrl && <img src={event.imageUrl} alt={event.title} className="event-detail-image" />}
      </div>
      
      <div className="event-details">
        <div className="event-info">
          <h2>Event Information</h2>
          <div className="info-item">
            <strong>Date:</strong> {formatDate(event.startDate)}
            {event.endDate && ` - ${formatDate(event.endDate)}`}
          </div>
          
          <div className="info-item">
            <strong>Location:</strong>
            <div>
              {event.locationName && <div>{event.locationName}</div>}
              {event.streetAddress && <div>{event.streetAddress}</div>}
              {event.city && event.state && <div>{event.city}, {event.state} {event.zipCode || ''}</div>}
              {event.city && !event.state && <div>{event.city} {event.zipCode || ''}</div>}
              {!event.city && event.state && <div>{event.state} {event.zipCode || ''}</div>}
            </div>
          </div>
          
          {event.category && (
            <div className="info-item">
              <strong>Category:</strong> {event.category}
            </div>
          )}
          
          {event.price && (
            <div className="info-item">
              <strong>Price:</strong> {event.price}
            </div>
          )}
          
          {event.organizer && (
            <div className="info-item">
              <strong>Organizer:</strong> {event.organizer}
            </div>
          )}
          
          {event.contactInfo && (
            <div className="info-item">
              <strong>Contact:</strong> {event.contactInfo}
            </div>
          )}
        </div>
        
        {event.description && (
          <div className="event-description">
            <h2>Description</h2>
            <p>{event.description}</p>
          </div>
        )}
        
        <div className="event-actions">
          <a 
            href={event.eventUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View on Source Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;