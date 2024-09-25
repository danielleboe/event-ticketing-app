import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EVENTS } from "../utils/queries"; // Import the necessary queries
import { ADD_TO_CART } from "../utils/mutations"; // Import the necessary mutations
import { useNavigate } from 'react-router-dom';
import "../styles/Home.css";
import { Link } from "react-router-dom";


const Home = ({ user, onLogout }) => {
  const { loading, error, data } = useQuery(GET_EVENTS); // Fetch events using GraphQL query
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [addToCart] = useMutation(ADD_TO_CART); // Create the mutation hook

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    navigate(`/search?keyword=${search}`);
    console.log("Search initiated for:", search);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddToCart = (eventId) => {
    addToCart({
      variables: {
        userId: user._id,
        eventId: eventId,
        quantity: 1, // Default quantity to 1
      },
    });
  };

  const handleViewCart = () => {
    if (user && user._id) {
      navigate(`/cart/${user._id}`);
    } else {
      console.error("User ID is undefined");
    }
  };

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
    <div className="home">

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
              <h2 className="eventHeadline">{event.name}</h2>
              <p>{event.description}</p>
              <p>{event.eventDate} {event.eventTime}</p>
              <p>{event.venue}</p>
              <p>{event.location}</p>
              <p>${event.price.toFixed(2)}</p>
              <p>Tags: {event.tags.join(', ')}</p>
              <button onClick={() => handleAddToCart(event.id)}>Add to Cart</button>
            </a>
          </div>
        ))}

      </div>


    </div>
  );
};

export default Home;
