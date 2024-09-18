import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom"; // Import the useNavigate hook
import "../styles/EventCreate.css";
import {
  ADD_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
} from "../utils/mutations";
import {
  GET_EVENT
} from "../utils/queries";

const EventForm = ({ onEventDeleted }) => {
  const { eventId } = useParams(); // Extract eventId from URL
  const [eventData, setEventData] = useState({
    id: 0,
    name: "",
    description: "",
    venue: "",
    location: "",
    eventDate: "",
    eventTime: "",
    tags: [],
    price: 0,
  });
  console.log(eventId);
  const navigate = useNavigate(); // Initialize the navigate function

  const [addEvent] = useMutation(ADD_EVENT);
  const [updateEvent] = useMutation(UPDATE_EVENT);
  const [deleteEvent] = useMutation(DELETE_EVENT);

  const { data } = useQuery(GET_EVENT, {
    variables: { id: eventId },
    skip: !eventId,
  });

  useEffect(() => {
    if (data) {
      setEventData(data.getEvent);
    }
  }, [data]);
  console.log(`data!!!!!!!`, data.id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`eventid`, eventId);
    console.log(`eventdata`, eventData);
    try {
      if (eventId) {
        // Update existing event
        await updateEvent({ variables: { id: eventId, ...eventData } });
      } else {
        // Create a new event
        const { data } = await addEvent({ variables: eventData });
        // eslint-disable-next-line no-const-assign
        eventId = data?.addEventEvent?.id; // Make sure this matches your server's response field
      }

      // Navigate only if eventId is valid
      if (eventId) {
        navigate(`/events/${eventId}`);
      } else {
        console.error("Failed to get event ID");
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleDelete = async () => {
    if (eventId) {
      await deleteEvent({ variables: { id: eventId } });
      if (onEventDeleted) onEventDeleted();
      // Redirect to a list of events or another relevant page after deleting
      navigate("/events");
    }
  };

  return (
    <section className="event-form-container">
      <h1 className="heading">Create New Event</h1>
      <form id="eventForm" onSubmit={handleSubmit}>
        <div className="input">
          <input
            className="input-field"
            id="nameInput"
            name="name"
            placeholder="  Event Name"
            value={eventData.name || ""}
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
            value={eventData.description || ""}
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
            value={eventData.venue || ""}
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
            value={eventData.location || ""}
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
            value={eventData.eventDate || ""}
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
            value={eventData.eventTime || ""}
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
            value={eventData.tags.join(", ") || ""}
            onChange={(e) =>
              setEventData((prev) => ({
                ...prev,
                tags: e.target.value.split(",").map((tag) => tag.trim()),
              }))
            }
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
            value={eventData.price || ""}
            onChange={handleChange}
            required
          />
          <label className="input-label">Price:</label>
        </div>
        <br />
        <br />

        <button className="button" id="saveButton" type="submit">
          Save Event
        </button>

        {eventId && (
          <button
            className="button"
            id="deleteButton"
            type="button"
            onClick={handleDelete}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Delete Event
          </button>
        )}
      </form>
    </section>
  );
};

export default EventForm;
