import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, onPurchase }) => {
  const navigate = useNavigate();

  const handlePurchase = () => {
    onPurchase();
    navigate('/order-confirmation');
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              Event ID: {item.eventId}, Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button onClick={handlePurchase}>Purchase</button>
      )}
    </div>
  );
};

export default Cart;