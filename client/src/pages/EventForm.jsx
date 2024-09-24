import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENT } from '../utils/queries';
import { UPDATE_EVENT } from '../utils/mutations';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const EventForm = ({ eventId }) => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EVENT, { variables: { id: eventId || id } });
  const [updateEvent] = useMutation(UPDATE_EVENT);
  const navigate = useNavigate(); // Get the navigate function

  const [formState, setFormState] = useState({
    name: '',
    description: '',
    venue: '',
    location: '',
    eventDate: '',
    eventTime: '',
    tags: [],
    price: '',
    url: ''
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading event details.</p>;

  const event = data?.event;

  if (!event) {
    return <p>No event found.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEvent({
        variables: {
          id: eventId || id,
          name: formState.name || event.name,
          description: formState.description || event.description,
          venue: formState.venue || event.venue,
          location: formState.location || event.location,
          eventDate: formState.eventDate || event.eventDate,
          eventTime: formState.eventTime || event.eventTime,
          tags: formState.tags ? formState.tags.split(',').map(tag => tag.trim()) : event.tags,
          price: parseFloat(formState.price) || event.price,
          url: formState.url || event.url
        }
      });
      alert('Event updated successfully!');
      navigate('/'); // Redirect to Home page
    } catch (err) {
      console.error(err);
      alert('Error updating event.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" defaultValue={event.name} onChange={handleChange} />

      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" defaultValue={event.description} onChange={handleChange} />

      <label htmlFor="venue">Venue</label>
      <input type="text" id="venue" name="venue" defaultValue={event.venue} onChange={handleChange} />

      <label htmlFor="location">Location</label>
      <input type="text" id="location" name="location" defaultValue={event.location} onChange={handleChange} />

      <label htmlFor="eventDate">Event Date</label>
      <input type="date" id="eventDate" name="eventDate" defaultValue={event.eventDate} onChange={handleChange} />

      <label htmlFor="eventTime">Event Time</label>
      <input type="time" id="eventTime" name="eventTime" defaultValue={event.eventTime} onChange={handleChange} />

      <label htmlFor="tags">Tags</label>
      <input type="text" id="tags" name="tags" defaultValue={event.tags.join(', ')} onChange={handleChange} />

      <label htmlFor="price">Price</label>
      <input type="number" id="price" name="price" defaultValue={event.price} onChange={handleChange} />

      <label htmlFor="url">URL</label>
      <input type="url" id="url" name="url" defaultValue={event.url} onChange={handleChange} />

      <button type="submit">Save</button>
    </form>
  );
};

export default EventForm;