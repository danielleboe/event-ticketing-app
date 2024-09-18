// client/src/components/UserProfile.jsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_PURCHASE_HISTORY } from '../utils/queries';
import './UserProfile.css'; // Import the CSS file for specific styles

const UserProfile = ({ user }) => {
  // Fetch the user's purchase history using the GraphQL query
  const { loading, error, data } = useQuery(GET_USER_PURCHASE_HISTORY, {
    variables: { id: user.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract the purchase history from the fetched data
  const purchaseHistory = data.user.purchaseHistory;
  const createdEventHistory = data.user.createdEventHistory;

  // Filter the purchase history to include only upcoming events
  const currentDate = new Date();
  const upcomingEvents = purchaseHistory.filter(event => new Date(event.date) > currentDate);
  const pastEvents = purchaseHistory.filter(event => new Date(event.date) <= currentDate);

  return (
    <div className="user-profile">
      <h1>{user.username}</h1>
      <p>Email: {user.email}</p>
      {/* Add more user details as needed */}
      
      <h2>Upcoming Events</h2>
      <ul>
        {upcomingEvents.map((event) => (
          <li key={event.id}>
            <h3><a href={event.url}>{event.name}</a></h3>
            <p>Date: {event.date}</p>
            <p>Purchased on: {event.purchaseDate}</p>
          </li>
        ))}
      </ul>

      <h2>Past Events</h2>
      <ul>
        {pastEvents.map((event) => (
          <li key={event.id}>
            <h3><a href={event.url}>{event.name}</a></h3>
            <p>Date: {event.date}</p>
            <p>Purchased on: {event.purchaseDate}</p>
          </li>
        ))}
      </ul>
      
      <h2>Created Events</h2> {/* Add this section */}
      <ul>
        {createdEventHistory.map((event) => (
          <li key={event.id}>
            <h3><a href={event.url}>{event.name}</a></h3>
            <p>Date: {event.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default UserProfile;