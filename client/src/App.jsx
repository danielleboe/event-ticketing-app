import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import UserProfile from './components/UserProfile'; // Import the UserProfile component
import Login from './pages/Login';
import EditEventForm from './pages/EditEventForm';
import EventPage from './pages/EventPage';
import EventForm from './pages/EventForm';
import Navbar from './components/Navbar'; // Capitalize the component name
import Cart from './pages/Cart'; // Capitalize the component name
import OrderConfirmation from './pages/OrderConfirmation';

import './App.css';

function App() {
  const [user, setUser] = useState(null); // User state
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);
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

  const handleAddToCart = (eventId, quantity) => {
    setCart((prevCart) => [...prevCart, { eventId, quantity }]);
    console.log(`Added ${quantity} tickets for event ${eventId} to cart.`);
  };

  const handlePurchase = () => {
    const order = {
      tickets: cart.map(item => ({
        eventId: item.eventId,
        eventName: "Sample Event", // Replace with actual event name
        location: "Sample Location", // Replace with actual location
        date: "Sample Date", // Replace with actual date
        quantity: item.quantity
      })),
      subtotal: 100, // Replace with actual subtotal calculation
      taxes: 10, // Replace with actual tax calculation
      total: 110 // Replace with actual total calculation
    };
    setOrder(order);
    setCart([]); // Clear the cart after purchase
  };

  return (
    <>
      {/* Navbar outside the Routes to appear on all pages */}
      <Navbar user={user} onLogout={handleLogout} />
      
      {/* Define your routes */}
      <Routes>
        <Route path="/" element={<Home user={isLoggedIn ? user : null} onLogout={handleLogout} />} />
        <Route 
          path="/profile" 
          element={isLoggedIn ? <UserProfile user={user} /> : <Navigate to="/login" />} 
        />
        <Route
         path="/login" 
        element={<Login onLogin={handleLogin} />} />
        <Route
         path="/events/:id" 
        element={<EventPage onAddToCart={handleAddToCart} />} />
        <Route 
        path="/events/new" 
        element={isLoggedIn ? <EventForm /> : <Navigate to="/login" />} />
    
    <Route path="/cart" element={<Cart cart={cart} onPurchase={handlePurchase} />} />
    <Route path="/events/edit/:id"  element={isLoggedIn ? <EditEventForm /> : <Navigate to="/login" />} 
       />
        <Route path="/order-confirmation" element={<OrderConfirmation order={order} />} />

      </Routes>

    </>
  );
}

export default App;
