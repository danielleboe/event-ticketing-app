import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom"; 
import "../styles/EventCreate.css";
import { ADD_EVENT } from "../utils/mutations";
// import { GET_EVENT } from "../utils/queries";

const EventForm = () => {
  // const { eventId } = useParams(); // Extract eventId from URL
    const { eventId } = useParams(); // Extract eventId from URL
  const [newEventId, setNewEventId] = useState(null); // New state to store the created event ID
  const [eventData, setEventData] = useState({
    id: null,
    name: "",
    description: "",
    venue: "",
    location: "",
    eventDate: "",
    eventTime: "",
    tags: [],
    price: 0,
  });
//   const navigate = useNavigate(); // Initialize the navigate function

  const [addEvent] = useMutation(ADD_EVENT);
//   const [updateEvent] = useMutation(UPDATE_EVENT);
//   const [deleteEvent] = useMutation(DELETE_EVENT);
console.log(`eventId`, eventId);
//   // Fetch existing event data if editing
//   const { data } = useQuery(GET_EVENT, {
//     variables: { id: eventId },
//     skip: !eventId,
//   });

//   // Update the form data when event data is fetched
//   useEffect(() => {
//     if (data?.event) {
//       setEventData(data.event);
//     }
//   }, [data]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Parse price to float for better handling of numeric values
    const parsedValue = name === "price" ? parseFloat(value) : value;

    setEventData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };


  //debugging code - temp
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`eventid`, eventId);
    console.log(`eventdata`, eventData);
  
    try {
        // Create a new event
        let response = await addEvent({
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
    })
        console.log(`data!!!!!!!`, response.data?.addEvent?.id);

        window.location.assign(`/events/${response.data?.addEvent?.id}`);
  
    //     // Get the new event ID
    //     const createdEventId = response.data?.addEvent?.id;
    //     setNewEventId(createdEventId);
    //   }
    }
  catch (error) {
      console.error("Error saving event:", error);
    }
  };
  
 
  return (
    <section className="event-form-container">
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
      </form>
    </section>
  );
};

export default EventForm;
