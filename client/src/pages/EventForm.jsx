import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { ADD_EVENT, UPDATE_EVENT, DELETE_EVENT, GET_EVENTS } from "../utils/queries"; 

const EventForm = ({ eventId, onEventDeleted }) => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    venue: '',
    location: '',
    eventDate: '',
    eventTime: '',
    tags: [],
    price: 0,
    url: ''
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const [addEvent] = useMutation(ADD_EVENT);
  const [updateEvent] = useMutation(UPDATE_EVENT);
  const [deleteEvent] = useMutation(DELETE_EVENT);

  const { data } = useQuery(GET_EVENTS, { variables: { id: eventId }, skip: !eventId });

  useEffect(() => {
    if (data) {
      setEventData(data.getEvent);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (eventId) {
      await updateEvent({ variables: { id: eventId, ...eventData } });
    } else {
      await addEvent({ variables: eventData });
    }
    // Redirect to the event page after saving
    navigate(`/events/${eventId || eventData.id}`);
  };

  const handleDelete = async () => {
    if (eventId) {
      await deleteEvent({ variables: { id: eventId } });
      if (onEventDeleted) onEventDeleted();
      // Redirect to a list of events or another relevant page after deleting
      navigate('/events');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Event Name:
        <input name="name" value={eventData.name || ''} onChange={handleChange} required />
      </label>
      <br />
      
      <label>
        Description:
        <textarea name="description" value={eventData.description || ''} onChange={handleChange} required />
      </label>
      <br />
      
      <label>
        Venue:
        <input name="venue" value={eventData.venue || ''} onChange={handleChange} required />
      </label>
      <br />
      
      <label>
        Location:
        <input name="location" value={eventData.location || ''} onChange={handleChange} required />
      </label>
      <br />
      
      <label>
        Event Date:
        <input type="date" name="eventDate" value={eventData.eventDate || ''} onChange={handleChange} required />
      </label>
      <br />
      
      <label>
        Event Time:
        <input type="time" name="eventTime" value={eventData.eventTime || ''} onChange={handleChange} required />
      </label>
      <br />
      
      <label>
        Tags (comma separated):
        <input
          name="tags"
          value={eventData.tags.join(', ') || ''}
          onChange={(e) =>
            setEventData((prev) => ({
              ...prev,
              tags: e.target.value.split(',').map((tag) => tag.trim()),
            }))
          }
        />
      </label>
      <br />
      
      <label>
        Price:
        <input type="number" name="price" value={eventData.price || 0} onChange={handleChange} required />
      </label>
      <br />
      
      <label>
        URL:
        <input name="url" value={eventData.url || ''} onChange={handleChange} required />
      </label>
      <br />

      <button type="submit">Save Event</button>

      {eventId && (
        <button type="button" onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>
          Delete Event
        </button>
      )}
    </form>
  );
};

export default EventForm;
