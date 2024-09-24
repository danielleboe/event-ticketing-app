import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import UserProfile from './components/UserProfile'; // Import the UserProfile component
import Login from './pages/Login';
import EditEventForm from './pages/EditEventForm';
import EventPage from './pages/EventPage';
import EventForm from './pages/EventForm';
// import TestingCartPage from './pages/TestingCartPage.jsx'; // Import the TestingCartPage component

function App() {


  const [user, setUser] = useState(null); // Start with null for a real scenario
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('authToken'); // clear token on logout
    sessionStorage.removeItem('userId'); // clear userId on logout
    navigate('/'); // Redirect to home or a suitable page after logout
  };

  const handleLogin = (user) => {
    setUser(user);
    console.log('User logged in:', user);
  };

  const isLoggedIn = !!user;
  useEffect(() => {
    console.log(isLoggedIn ? 'Logged In' : 'Logged Out');
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route path="/" element={<Home user={isLoggedIn ? user : null} onLogout={handleLogout} />} />
      <Route path="/profile" element={user ? <UserProfile user={user} /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/events/:id" element={<EventPage />} />
      <Route path="/events/new" element={<EventForm />} />
      <Route path="/events/edit/:id" element={<EditEventForm />} />
      {/* <Route path="/testing-cart" element={<TestingCartPage user={user} />} /> */}
    </Routes>
  );
}



export default App;