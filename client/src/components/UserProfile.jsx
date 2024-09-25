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

  // Check if data and purchaseHistory or createdEventHistory exist
  const purchaseHistory = data?.user?.purchaseHistory || [];
  const createdEventHistory = data?.user?.createdEventHistory || [];

  // Get current date
  const currentDate = new Date();

  // Filter upcoming and past events only if there is a purchase history
  const upcomingEvents = purchaseHistory.length
    ? purchaseHistory.filter((event) => new Date(event.date) > currentDate)
    : [];
  const pastEvents = purchaseHistory.length
    ? purchaseHistory.filter((event) => new Date(event.date) <= currentDate)
    : [];

  return (
    <div className="home">
      <h1>Welcome, {user.username}</h1>
      <p>Email: {user.email}</p>

      {/* Only display upcoming events if there are any */}
      {upcomingEvents.length > 0 ? (
        <>
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
        </>
      ) : (
        <p>No upcoming events.</p>
      )}

      {/* Only display past events if there are any */}
      {pastEvents.length > 0 ? (
        <>
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
        </>
      ) : (
        <p>No past events.</p>
      )}

      {/* Only display created events if there are any */}
      {createdEventHistory.length > 0 ? (
        <>
          <h2>Created Events</h2>
          <ul>
            {createdEventHistory.map((event) => (
              <li key={event.id}>
                <h3><a href={event.url}>{event.name}</a></h3>
                <p>Date: {event.date}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No events created by you.</p>
      )}

      <Cart userId={user._id} />
    </div>
  );
};

export default UserProfile;
