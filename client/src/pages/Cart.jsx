import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CART_ITEMS } from '../utils/queries';
import CheckoutModal from '../components/CheckoutModal';

const Cart = ({ userId, onPurchase }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch cart items using GraphQL
  const { loading, error, data } = useQuery(GET_CART_ITEMS, {
    variables: { id: userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Get cart items from the fetched data, ensuring fallback for undefined
  const cartItems = data?.cart?.items || [];

  // Calculate subtotal, taxes, and total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxes = subtotal * 0.1; // Assuming a 10% tax rate
  const total = subtotal + taxes;

  // Handle purchase process
  const handlePurchase = () => {
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = async (paymentMethod) => {
    // Process the purchase here (e.g., send paymentMethod to your server)
    await onPurchase(paymentMethod);
    setIsModalOpen(false);
    navigate('/order-confirmation');
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              Event ID: {item.eventId}, Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <button onClick={handlePurchase}>Purchase</button>
      )}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cart={cartItems}
        subtotal={subtotal}
        taxes={taxes}
        total={total}
        onConfirm={handleConfirmPurchase}
      />
    </div>
  );
};

export default Cart;
