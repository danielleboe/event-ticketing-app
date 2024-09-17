import { useState } from "react";
// import { useQuery } from "@apollo/client";
// import { GET_EVENTS } from "../utils/queries"; // Import the query for fetching events
import "../styles/Home.css";

const Home = () => {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

const dummyEvents = [
  { id: "1", name: "Concert A", location: "Venue A", date: "2024-09-30", price: 49.99 },
  { id: "2", name: "Concert B", location: "Venue B", date: "2024-10-05", price: 59.99 },
  { id: "3", name: "Concert C", location: "Venue C", date: "2024-10-10", price: 39.99 },
  { id: "4", name: "Concert D", location: "Venue D", date: "2024-10-15", price: 29.99 },
];



  // const { loading, error, data } = useQuery(GET_EVENTS); // Fetch events using GraphQL query

  // Function to handle search action
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Search initiated for:', search);
    // Add your search logic here (e.g., filtering events based on the search input)
  };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // Filter events based on search input

  const filteredEvents = dummyEvents.filter(event => {
    // Search filter
    const matchesSearch = event.name.toLowerCase().includes(search.toLowerCase());
    
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
            placeholder="Min Price" className="min-price"
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price"  className="max-price"
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>
      </div>

      {/* List of Events */}
      <div className="eventList-headline">
        <h1>Upcoming Events</h1>
      </div>
      <div className="event-container">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card"><a href="#{event.url}" className="event-link">
            <h2>{event.name}</h2>
            <p>
              {event.date} - {event.location}
            </p>
            <p>${event.price.toFixed(2)}</p>    
            </a>      
            </div>
            
        ))}
      </div>
    </div>
  );
};

export default Home;
