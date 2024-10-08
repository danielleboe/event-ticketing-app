import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';  
import { GET_EVENT } from '../utils/queries';
import { UPDATE_EVENT, DELETE_EVENT } from '../utils/mutations';

import "../styles/EventCreate.css";

const EditEvent = () => {
  const navigate = useNavigate();
  const { id: eventId } = useParams();  
  console.log("eventId from URL:", eventId); // Log to check if eventId is defined
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    venue: '',
    location: '',
    eventDate: '',
    eventTime: '',
    tags: [],
    price: 0,
  });

  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { id: eventId },
  });

  const [updateEvent] = useMutation(UPDATE_EVENT);
  const [deleteEvent] = useMutation(DELETE_EVENT);

  useEffect(() => {
    if (data?.event) {

      const formattedDate = new Date(data.event.eventDate).toISOString().split('T')[0]; // Format as YYYY-MM-DD
      const formattedTime = data.event.eventTime.slice(0, 5); // Assuming eventTime is like 'HH:MM:SS', we slice it to 'HH:MM'

      setEventData({
        name: data.event.name,
        description: data.event.description,
        venue: data.event.venue,
        location: data.event.location,
        eventDate: formattedDate,
        eventTime: formattedTime,
        tags: data.event.tags || [],
        price: data.event.price, // Ensure price is a number
      });
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading event</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: name === "tags" ? value.split(",").map((tag) => tag.trim()) : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateEvent({ 
        variables: {
            id: eventId,
            name: eventData.name,
            description: eventData.description,
            venue: eventData.venue,
            location: eventData.location,
            eventDate: eventData.eventDate,  // Ensure correct format here (YYYY-MM-DD)
            eventTime: eventData.eventTime,  // Ensure correct format here (HH:MM)
            tags: eventData.tags,
            price: parseFloat(eventData.price),  // Ensure price is a number
          },
      });
      navigate(`/events/${eventId}`); // Redirect to the event page after update
    } catch (error) {
      console.error("Error updating event:", error.message || error);
    }
  };

//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to delete this event?")) {
//       try {
//         await deleteEvent({
//           variables: { id: eventId },
//         });
//         navigate('/'); // Redirect to homepage after deletion
//       } catch (error) {
//         console.error("Error deleting event:", error.message || error);
//       }
//     }
//   };

const handleDelete = async (event) => {
  event.preventDefault();
  console.log("Current Event :", eventId);
    try {
      const { data } = await deleteEvent({ variables: { eventId: eventId } });
      console.log("Delete Result: ", data);
       navigate('/'); // Redirect to homepage after deletion

      if (data.deleteEvent.success !== false) {
        console.log("Event deleted:", data.deleteEvent);
        alert("Event Deleted!");
        // Possibly redirect to another page
      } else {
        console.error("Failed to delete event:", data.deleteEvent.message);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  

  return (
        <section className="event-form-container">
          <h1>Edit Event</h1>
          <form id="eventForm" onSubmit={handleUpdate}>
            {/* Input fields */}
            <div className="input">
              <input
                className="input-field"
                id="nameInput"
                name="name"
                placeholder="  Event Name"
                value={eventData.name || ""} // Use eventData.name for input value
                onChange={handleChange}
                required
              />
              <label className="input-label">Event Name:</label>
            </div>
            <br />
            <div className="input">
              <textarea
                className="input-field"
                id="descriptionInput"
                name="description"
                placeholder="  Description"
                value={eventData.description || ""} // Use eventData.description for input value
                onChange={handleChange}
                required
              />
              <label className="input-label">Description:</label>
            </div>
            <br />
            <div className="input">
              <input
                className="input-field"
                id="venueInput"
                name="venue"
                placeholder="  Venue"
                value={eventData.venue || ""} // Use eventData.venue for input value
                onChange={handleChange}
                required
              />
              <label className="input-label">Venue:</label>
            </div>
            <br />
            <div className="input">
              <input
                className="input-field"
                id="locationInput"
                name="location"
                placeholder="  Address"
                value={eventData.location || ""} // Use eventData.location for input value
                onChange={handleChange}
                required
              />
              <label className="input-label">Address:</label>
            </div>
            <br />
            <div className="input">
              <input
                className="input-field"
                id="dateInput"
                type="date"
                name="eventDate"
                placeholder="  Event Date"
                value={eventData.eventDate || ""} // Use eventData.eventDate for input value
                onChange={handleChange}
                required
              />
              <label className="input-label">Event Date:</label>
            </div>
            <br />
            <div className="input">
              <input
                className="input-field"
                id="timeInput"
                type="time"
                name="eventTime"
                placeholder="  Event Time"
                value={eventData.eventTime || ""} // Use eventData.eventTime for input value
                onChange={handleChange}
                required
              />
              <label className="input-label">Event Time:</label>
            </div>
            <br />
            <div className="input">
              <input
                className="input-field"
                id="tagInput"
                name="tags"
                placeholder="  Tags"
                value={eventData.tags.join(", ") || ""} // Join tags for input value
                onChange={handleChange}
              />
              <label className="input-label">Tags (comma separated): </label>
            </div>
            <br />
            <div className="input">
              <input
                className="input-field"
                id="priceInput"
                type="number"
                name="price"
                placeholder="  Price"
                value={eventData.price || ""} // Use eventData.price for input value
                onChange={handleChange}
                required
              />
              <label className="input-label">Price:</label>
            </div>
            <br />
            <br />
          <div className="buttons">
            <button className="button" id="saveButton" type="submit">
             Update Event
            </button>
           
              <button className="button" id="deleteButton" type="button" onClick={handleDelete}>
                Delete Event
              </button>
              </div>
          </form>
        </section>
      );
    };

export default EditEvent;
