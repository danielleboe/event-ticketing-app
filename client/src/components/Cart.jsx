import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutModal from '../components/CheckoutModal';

const Cart = ({ cart, onPurchase }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxes = subtotal * 0.1; // Assuming 10% tax rate
  const total = subtotal + taxes;

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
      <CheckoutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          cart={cart}
          subtotal={subtotal}
          taxes={taxes}
          total={total}
          onConfirm={handleConfirmPurchase}
      />
    </div>
  );
};

export default Cart;