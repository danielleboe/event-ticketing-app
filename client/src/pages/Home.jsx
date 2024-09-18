import { useState } from "react";
// import { useQuery } from "@apollo/client";
// import { GET_EVENTS } from "../utils/queries"; // Import the query for fetching events
import "../styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  

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
      tags: ["dance", "concert", "music"]
    },
    {
      id: "2",
      name: "Madonna",
      description:
        "Get ready for an Excellence concert series at the Gallivan - live music, swing dancing, and unforgettable memories await!",
      venue: "Union Hall",
      location: "301 S Temple, Salt Lake City, UT 84101",
      date: "2024-10-05",
      price: 59.99,
      tags: ["concert", "pop", "music"]
    },
    {
      id: "3",
      name: "Billy Joel",
      description:
        "Get ready for an Excellence concert series at the Gallivan - live music, swing dancing, and unforgettable memories await!",
      venue: "Soundwell",
      location: "301 S Temple, Salt Lake City, UT 84101",
      date: "2024-10-10",
      price: 39.99,
      tags: ["conference", "business", "startups"]
    },
    {
      id: "4",
      name: "Concert D",
      description:
        "Get ready for an Excellence concert series at the Gallivan - live music, swing dancing, and unforgettable memories await!",
      venue: "Squatters Pub Brewery",
      location: "301 S Temple, Salt Lake City, UT 84101",
      date: "2024-10-15",
      price: 29.99,
      tags: ["concert", "hip hop", "engineering"]
    },
    {
      id: "5",
      name: "Concert E",
      description:
        "Get ready for an Excellence concert series at the Gallivan - live music, swing dancing, and unforgettable memories await!",
      venue: "Newpark Resort",
      location: "301 S Temple, Salt Lake City, UT 84101",
      date: "2024-10-20",
      price: 19.99,
      tags: ["dance", "swing", "music"]
    },
    {
      id: "6",
      name: "Concert F",
      description:
        "Get ready for an Excellence concert series at the Gallivan - live music, swing dancing, and unforgettable memories await!",
      venue: "The Bright Building",
      location: "301 S Temple, Salt Lake City, UT 84101",
      date: "2024-11-15",
      price: 9.99,
      tags: ["dance", "swing", "music"]
    },
    {
      id: "7",
      name: "Concert G",
      description:
        "Get ready for an Excellence concert series at the Gallivan - live music, swing dancing, and unforgettable memories await!",
      venue: "Delta Center",
      location: "301 S Temple, Salt Lake City, UT 84101",
      date: "2024-12-15",
      price: 109.99,
      tags: ["dance", "swing", "music"]
    },
    {
      id: "8",
      name: "Concert H",
      description:
        "Get ready for an Excellence concert series at the Gallivan - live music, swing dancing, and unforgettable memories await!",
      venue: "Salt Palace",
      location: "301 S Temple, Salt Lake City, UT 84101",
      date: "2024-09-29",
      price: 200.0,
      tags: ["dance", "swing", "music"]
    },
  ];

  // const { loading, error, data } = useQuery(GET_EVENTS); // Fetch events using GraphQL query

  // Function to handle search action
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Search initiated for:", search);
    // Add your search logic here (e.g., filtering events based on the search input)
  };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // Filter events based on search input

  const filteredEvents = dummyEvents.filter((event) => {
    // Search filter (checking name, location, and venue)
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
  

  // const filteredEvents = data.events.filter(event =>
  //   event.name.toLowerCase().includes(search.toLowerCase())
  // );

  return (
    <div>
    {/* Login Button Container */}
    {/* Ensures the login button is centered and placed just above the search bar */}
    <div className="login-button-container">
      <Link to="/login">
        <button className="login-button">Login</button>
      </Link>
    </div>
      <div>
        <form onSubmit={handleSearch} className="search-container">
          <input
            type="text"
            id="search-bar"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* 
          <button className="get-tickets">

          </button> */}
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
            <a href="#{event.url}" className="event-link">
              <h2>{event.name}</h2>
              <p>{event.description}</p>
              <p>{event.date}</p>
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
