// client/src/App.jsx
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EditEventForm from './pages/EditEventForm';
import EventPage from './pages/EventPage';
import EventForm from './pages/EventForm';
import UserProfile from './components/UserProfile'; // Import the UserProfile component

function App() {
  const dummyUser = {
    id: '1', // Replace with actual user ID
    username: 'johndoe',
    email: 'johndoe@example.com',
    // Add more user details as needed
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<UserProfile user={dummyUser} />} /> {/* Add the route for the user profile */}
      <Route path="/events/:id" element={<EventPage />} />
      <Route path="/events/new" element={<EventForm />} />
      <Route path="/events/edit/:id" element={<EditEventForm />} />
    </Routes>
  );
}

export default App;