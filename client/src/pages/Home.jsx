import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_PURCHASE_HISTORY } from "../utils/queries";
import "../styles/Home.css";
import { Link } from "react-router-dom";
// s

const Home = ({ user, onLogout }) => {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const { loading, error, data } = useQuery(GET_USER_PURCHASE_HISTORY, {
    variables: { id: user?.id },
    skip: !user,
  });

  const dummyEvents = [
    {
      id: "1",
      name: "Live at the Gallivan!",
      description:
        "Get ready for an Excellence concert series at the Gallivan - live music, swing dancing, and unforgettable memories await!",
      venue: "Gallivan",
      location: "301 S Temple, Salt Lake City, UT 84101",
      date: "2024-09-30",
      price: 49.99,
      tags: ["dance", "concert", "music"],
    },
    {
      id: "2",
      name: "Madonna",
      description:
        "Experience the Queen of Pop live at Union Hall, with an evening of her greatest hits!",
      venue: "Union Hall",
      location: "301 S Temple, Salt Lake City, UT 84101",
      date: "2024-10-05",
      price: 59.99,
      tags: ["concert", "pop", "music"],
    },  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const purchaseHistory = data?.user?.purchaseHistory || [];
  const createdEventHistory = data?.user?.createdEventHistory || [];
  
  const currentDate = new Date();
  const upcomingEvents = purchaseHistory.filter(event => new Date(event.date) > currentDate);
  const pastEvents = purchaseHistory.filter(event => new Date(event.date) <= currentDate);

  const filteredEvents = dummyEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase()) ||
      event.venue.toLowerCase().includes(search.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesDate = selectedDate ? event.date === selectedDate : true;
    const price = event.price;
    const matchesMinPrice = minPrice ? price >= minPrice : true;
    const matchesMaxPrice = maxPrice ? price <= maxPrice : true;

    return matchesSearch && matchesDate && matchesMinPrice && matchesMaxPrice;
  });

  const renderEvents = (events) => (
    <div className="event-container">
      {events.map((event) => (
        <div key={event.id} className="event-card">
          <a href={event.url} className="event-link">
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p>{event.venue}</p>
            <p>{event.location}</p>
            <p>${event.price.toFixed(2)}</p>
            <p>Tags: {event.tags.join(', ')}</p>
          </a>
        </div>
      ))}
    </div>
  );

  return (
    <div className="home">
    <div className="auth-buttons">
      {user ? (
        <button className="logout-button" onClick={onLogout}>Logout</button>
      ) : (
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      )}
    </div>

      <form onSubmit={(e) => e.preventDefault()} className="search-container">
        <input
          type="text"
          id="search-bar"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

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

      {user ? (
        <>
          <h1>Welcome, {user.username}</h1>
          <p>Email: {user.email}</p>

          <h2>Upcoming Events</h2>
          {renderEvents(upcomingEvents)}

          <h2>Past Events</h2>
          {renderEvents(pastEvents)}

          <h2>Created Events</h2>
          {renderEvents(createdEventHistory)}
        </>
      ) : (
        <>
          <h1>Upcoming Events</h1>
          {renderEvents(filteredEvents)}
        </>
      )}
    </div>
  );
};

export default Home;
