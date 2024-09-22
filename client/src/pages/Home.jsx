import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../utils/queries"; // Import the necessary queries
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


  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    navigate(`/search?keyword=${search}`);
    console.log("Search initiated for:", search);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // // Fetch user purchase history if user is logged in
  // const { loading: userLoading, error: userError } = useQuery(GET_USER_PURCHASE_HISTORY, {
  //   variables: { id: user?.id },
  //   skip: !user,
  // });

  // Fetch events

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
  
 


  // // Handle loading and error states
  // if (userLoading || eventsLoading) return <p>Loading...</p>;
  // if (userError || eventsError) return <p>Error: {userError?.message || eventsError?.message}</p>;

  // // Retrieve purchase history and created event history from the user data
  // const purchaseHistory = userData?.user?.purchaseHistory || [];
  // const createdEventHistory = userData?.user?.createdEventHistory || [];

  // // Filter upcoming and past events from the user's purchase history
  // const currentDate = new Date();
  // const upcomingEvents = purchaseHistory.filter(event => new Date(event.date) > currentDate);
  // const pastEvents = purchaseHistory.filter(event => new Date(event.date) <= currentDate);

  // Filter events based on search, price, and date
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

  // // Render events
  // const renderEvents = (events) => (
  //   <div className="event-container">
  //     {events.map((event) => (
  //       <div key={event.id} className="event-card">
  //         <a href={event.url} className="event-link">
  //           <h2>{event.name}</h2>
  //           <p>{event.description}</p>
  //           <p>{event.date}</p>
  //           <p>{event.venue}</p>
  //           <p>{event.location}</p>
  //           <p>${event.price.toFixed(2)}</p>
  //           <p>Tags: {event.tags.join(', ')}</p>
  //         </a>
  //       </div>
  //     ))}
  //   </div>
  // );

  // Handle search submission


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
                  <button onClick={() => navigate('/testing-cart')} className="cart-button">View Cart</button>

      </div>


      {/* {user ? (
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
      )} */}
    </div>
  );
};

export default Home;
