import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_EVENTS } from "../utils/queries";
import { DELETE_EVENT } from '../utils/mutations';
import "../styles/Home.css";
import EventForm from './EventForm'; // Import the EventForm component

const Home = () => {
  const { loading, error, data } = useQuery(GET_EVENTS);
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  console.log("loading:", loading);
  console.log("error:", error);
  console.log("data:", data);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?keyword=${search}`);
  };

  const handleDelete = async (eventId) => {
    try {
      const { data } = await deleteEvent({ variables: { id: eventId } });
      if (data.deleteEvent) {
        console.log("Event deleted successfully");
      }
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredEvents = data.events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase()) ||
      event.venue.toLowerCase().includes(search.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesDate = selectedDate ? event.eventDate === selectedDate : true;
    const price = event.price;
    const matchesMinPrice = minPrice ? price >= parseFloat(minPrice) : true;
    const matchesMaxPrice = maxPrice ? price <= parseFloat(maxPrice) : true;

   

    return matchesSearch && matchesDate && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <div>
      <h1>Welcome to the Event Ticketing App</h1>

      {/* Render the EventForm component above the search bar
      <EventForm /> */}

      {/* Search Bar */}
      <div>
        <form onSubmit={handleSearch} className="search-container">
          <input
            type="text"
            id="search-bar"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      {/* Filter Controls */}
      <div className="filters-container">
        <label>
          Min Price:
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min Price"
            className="min-price"
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price"
            className="max-price"
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-select"
          />
        </label>
      </div>

      {/* List of Events */}
      <div className="eventList-headline">
        <h1>Upcoming Events</h1>
      </div>
      <div className="event-container">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card">
            <a href={`/events/${event.id}`} className="event-link">
              <h2>{event.name}</h2>
              <p>{event.description}</p>
              <p>{event.eventDate} {event.eventTime}</p>
              <p>{event.venue}</p>
              <p>{event.location}</p>
              <p>${event.price.toFixed(2)}</p>
              <p>Tags: {event.tags.join(', ')}</p>
            </a>
            {/* Add Edit Button */}
            <button
              className="button"
              onClick={() => navigate(`/events/edit/${event.id}`)}
            >
              Edit
            </button>
               {/* Delete Button */}
            <button
              className="button"
              onClick={() => handleDelete(event.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;