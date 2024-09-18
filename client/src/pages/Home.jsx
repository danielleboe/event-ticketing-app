import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_EVENTS } from "../utils/queries"; // Import the query for fetching events
import "../styles/Home.css";

const Home = () => {
  const { loading, error, data } = useQuery(GET_EVENTS); // Fetch events using GraphQL query
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Function to handle search action
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    navigate(`/search?keyword=${search}`);
    console.log("Search initiated for:", search);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filter events based on search input
  const filteredEvents = data.events.filter((event) => {
    // Search filter (checking name, location, venue, and tags)
    const matchesSearch =
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase()) ||
      event.venue.toLowerCase().includes(search.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
  
    // Date filter
    const matchesDate = selectedDate ? event.date === selectedDate : true;
  
    // Price filters
    const price = event.price;
    const matchesMinPrice = minPrice ? price >= minPrice : true;
    const matchesMaxPrice = maxPrice ? price <= maxPrice : true;
  
    return matchesSearch && matchesDate && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <div>
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
              <p>{event.eventDate}  {event.eventTime}</p>
              <p>{event.venue}</p>
              <p>{event.location}</p>
              <p>${event.price.toFixed(2)}</p>
              <p>Tags: {event.tags.join(', ')}</p> {/* Display the tags */}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
