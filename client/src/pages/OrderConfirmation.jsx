import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = ({ order }) => {
  if (!order) {
    return <p>No order to display.</p>;
  }

  const { tickets, subtotal, taxes, total } = order;

  return (
    <div className="order-confirmation">
      <h1>Order Confirmation</h1>
      <p>Your order has been confirmed</p>
      <ul>
        {tickets.map((ticket, index) => (
          <li key={index}>
            <p>Event: <Link to={`/events/${ticket.eventId}`}>{ticket.eventName}</Link></p>
            <p>Location: {ticket.location}</p>
            <p>Date: {ticket.date}</p>
            <p>Quantity: {ticket.quantity}</p>
          </li>
        ))}
      </ul>
      <div className="order-summary">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Taxes: ${taxes.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
      </div>
      <Link to="/tickets">View Tickets</Link>
      <button onClick={() => window.location.href = '/'}>Return to Homepage</button>
    </div>
  );
};

export default OrderConfirmation;