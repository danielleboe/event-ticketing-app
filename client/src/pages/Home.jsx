import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../utils/queries"; // Import the query for fetching events
import "../styles/Home.css";

const dummyEvents = [
  { id: "1", name: "Concert A", location: "Venue A", date: "2024-09-30", price: 49.99 },
  { id: "2", name: "Concert B", location: "Venue B", date: "2024-10-05", price: 59.99 },
  { id: "3", name: "Concert C", location: "Venue C", date: "2024-10-10", price: 39.99 },
  { id: "4", name: "Concert D", location: "Venue D", date: "2024-10-15", price: 29.99 },
];


const Home = () => {
  const [search, setSearch] = useState('');
  const { loading, error, data } = useQuery(GET_EVENTS); // Fetch events using GraphQL query

  // Function to handle search action
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Search initiated for:', search);
    // Add your search logic here (e.g., filtering events based on the search input)
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filter events based on search input

  const filteredEvents = dummyEvents.filter(event =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );
  // const filteredEvents = data.events.filter(event =>
  //   event.name.toLowerCase().includes(search.toLowerCase())
  // );

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

      {/* List of Events */}
      <div className="eventList-headline">
        <h1>Upcoming Events</h1>
      </div>
      <div className="event-container">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card">
            <h2>{event.name}</h2>
            <p>
              {event.date} - {event.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
