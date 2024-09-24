import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './CheckoutModal.css';

//Stripe Public Keys
const stripePromise = loadStripe('pk_live_51Q2OzvCcLIkd4QDaOo8ufTiieYbVDrj7zzKsIZ1ytycJN0wlHSicR1Ktma7oZKdmfoUDitI1Qw4UtICxnwYHVUaM00w022FNXj');

const CheckoutForm = ({ cart, subtotal, taxes, total, onConfirm }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      onConfirm(paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            Event ID: {item.eventId}, Quantity: {item.quantity}, Price: ${item.price} x {item.quantity} = ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <div className="order-summary">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Taxes: ${taxes.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
      </div>
      <CardElement />
      <button type="submit" className="confirm-button" disabled={!stripe}>Confirm Purchase</button>
    </form>
  );
};

const CheckoutModal = ({ isOpen, onClose, cart, subtotal, taxes, total, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Checkout</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm cart={cart} subtotal={subtotal} taxes={taxes} total={total} onConfirm={onConfirm} />
        </Elements>
        <button onClick={onClose} className="close-button">Cancel</button>
      </div>
    </div>
  );
};

export default CheckoutModal;