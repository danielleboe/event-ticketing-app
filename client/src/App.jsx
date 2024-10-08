import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import UserProfile from './components/UserProfile';
import Login from './pages/Login';
import EditEvent from './pages/EditEvent';
import EventPage from './pages/EventPage';
import CreateEvent from './pages/CreateEvent';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import Checkout from './pages/Checkout';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const fetchUser = async (token) => {
    // Mock user data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: '1', name: 'John Doe' });
      }, 0);
    });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      fetchUser(token)
        .then(fetchedUser => {
          setUser(fetchedUser);
        })
        .catch(error => {
          console.error('Failed to fetch user:', error);
          navigate("/login");
        });
    } else {
      // navigate("/login");
    }
  }, [navigate]);

// App.jsx
const handleLogin = (user, token) => {
  setUser(user);
  sessionStorage.setItem('authToken', token); // Store the token
  console.log('User logged in:', user);
};


  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    navigate('/');
  };

  const isLoggedIn = !!user;

  useEffect(() => {
    console.log(isLoggedIn ? 'Logged In' : 'Logged Out');
  }, [isLoggedIn]);

  const handleAddToCart = (eventId, quantity) => {
    setCart((prevCart) => [...prevCart, { eventId, quantity }]);
  };

  useEffect(() => {
    if (!user) {
      console.log('User is null on EventPage'); // Log if the user is null
    }
  }, [user]);
  

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home user={isLoggedIn ? user : null} onLogout={handleLogout} />} />
        {/* <Route 
          path="/profile" 
          element={isLoggedIn ? <UserProfile user={user} /> : <Navigate to="/login" />} 
        /> */}
        <Route
         path="/login" 
        element={<Login onLogin={handleLogin} />} />
        <Route
         path="/events/:id" 
        element={<EventPage onAddToCart={handleAddToCart} user={user}/>} />
        <Route 
        path="/events/new" 
        element={isLoggedIn ? <CreateEvent /> : <Navigate to="/login" />} />
       <Route path="/events/edit/:id" element={<EditEvent />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
