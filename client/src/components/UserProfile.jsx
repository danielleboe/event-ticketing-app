// client/src/components/UserProfile.jsx
import { useQuery } from '@apollo/client';
import { GET_USER_PURCHASE_HISTORY } from '../utils/queries';
import Cart from '../pages/Cart';
import './UserProfile.css'; // Corrected the path to the CSS file

const UserProfile = ({ user }) => {
  const { loading, error, data } = useQuery(GET_USER_PURCHASE_HISTORY, {
    variables: { id: user._id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const purchaseHistory = data.user.purchaseHistory;
  const createdEventHistory = data.user.createdEventHistory;

  const currentDate = new Date();
  const upcomingEvents = purchaseHistory.filter(event => new Date(event.date) > currentDate);
  const pastEvents = purchaseHistory.filter(event => new Date(event.date) <= currentDate);

  return (
    <div className="home">
      <h1>Welcome, {user.username}</h1>
      <p>Email: {user.email}</p>

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

      <h2>Created Events</h2>
      <ul>
        {createdEventHistory.map((event) => (
          <li key={event.id}>
            <h3><a href={event.url}>{event.name}</a></h3>
            <p>Date: {event.date}</p>
          </li>
        ))}
      </ul>
      <Cart userId={user._id} />
    </div>
  );
};

export default UserProfile;