// client/src/App.jsx
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import UserProfile from './components/UserProfile';
import Login from './pages/Login'; // Import the Login component

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
      <Route path="/profile" element={<UserProfile user={dummyUser} />} />
      <Route path="/login" element={<Login />} /> {/* Add the route for the login page */}
    </Routes>
  );
}

export default App;