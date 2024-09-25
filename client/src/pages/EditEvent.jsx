import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom"; 
import "../styles/EventCreate.css";
import { ADD_EVENT, UPDATE_EVENT, DELETE_EVENT } from "../utils/mutations";
import { GET_EVENT } from "../utils/queries";

const EditEvent = () => {
  const { eventId } = useParams(); // Extract eventId from URL
  const navigate = useNavigate(); // Initialize the navigate function
  const [eventData, setEventData] = useState({
    id: "",
    name: "",
    description: "",
    venue: "",
    location: "",
    eventDate: "",
    eventTime: "",
    tags: [],
    price: 0,
  });

  const [addEvent] = useMutation(ADD_EVENT);
  const [updateEvent] = useMutation(UPDATE_EVENT);
  const [deleteEvent] = useMutation(DELETE_EVENT);

  // Fetch existing event data if editing
  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { id: eventId },
    skip: !eventId,
  });

  // Update the form data when event data is fetched
  useEffect(() => {
    if (data?.event) {
        console.log("Fetched Data:", data); // Check what data is being fetched
      setEventData({
        id: data.event.id, // Set the ID to the state
        name: data.event.name,
        description: data.event.description,
        venue: data.event.venue,
        location: data.event.location,
        eventDate: data.event.eventDate,
        eventTime: data.event.eventTime,
        tags: data.event.tags || [],
        price: data.event.price,
      });

    }
  }, [data]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEventData((prev) => ({
      ...prev,
      [name]: name === "tags" ? value.split(",").map((tag) => tag.trim()) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let response;

      if (eventId) {
        // Update the existing event
        response = await updateEvent({
          variables: { 
            id: eventData.id,
            name: eventData.name,
            description: eventData.description,
            venue: eventData.venue,
            location: eventData.location,
            eventDate: eventData.eventDate,
            eventTime: eventData.eventTime,
            tags: eventData.tags,
            price: eventData.price
          }
        });
      } else {
        // Create a new event
        response = await addEvent({
          variables: { 
            name: eventData.name,
            description: eventData.description,
            venue: eventData.venue,
            location: eventData.location,
            eventDate: eventData.eventDate,
            eventTime: eventData.eventTime,
            tags: eventData.tags,
            price: eventData.price
          }
        });
      }

      console.log(response.data);
      navigate(`/events/${response.data?.addEvent?.id || response.data?.addEvent?.id}`); // Redirect to the event page
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent({
          variables: { id: eventId },
        });
        navigate('/events'); // Redirect after deletion
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  if (loading) return <p>Loading...</p>; // Loading state
  if (error) return <p>Error loading event data: {error.message}</p>; // Error handling

  return (
    <section className="event-form-container">
      <h1>Edit Event</h1>
      <form id="eventForm" onSubmit={handleSubmit}>
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
          {eventId ? "Update Event" : "Save Event"}
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
