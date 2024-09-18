// client/src/App.jsx
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
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
      <Route path="/search" element={<Search />} />
      <Route path="/profile" element={<UserProfile user={dummyUser} />} /> {/* Add the route for the user profile */}
    </Routes>
  );
}

export default App;