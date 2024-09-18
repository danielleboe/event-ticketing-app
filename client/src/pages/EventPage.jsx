import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_EVENT } from '../utils/queries';

const EventPage = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const { loading, error, data } = useQuery(GET_EVENT, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading event details.</p>;

  const event = data.getEvent;

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>Venue: {event.venue}</p>
      <p>Location: {event.location}</p>
      <p>Date: {event.eventDate}</p>
      <p>Time: {event.eventTime}</p>
      <p>Price: ${event.price}</p>
      <p>Tags: {event.tags.join(', ')}</p>
      <p><a href={event.url}>Event URL</a></p>
    </div>
  );
};

export default EventPage;
