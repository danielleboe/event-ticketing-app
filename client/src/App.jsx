import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import UserProfile from './components/UserProfile';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null); // Start with null for a real scenario
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
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
      <Route path="/search" element={<Search />} />
      <Route 
        path="/profile" 
        element={user ? <UserProfile user={user} /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
    </Routes>
  );
}

export default App;