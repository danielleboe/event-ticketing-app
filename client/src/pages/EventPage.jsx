import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EVENT } from '../utils/queries';
import { useParams } from 'react-router-dom';  

import "../styles/Event.css";

const EventPage = ({ onAddToCart }) => {  // Accept onAddToCart as a prop
  const { id: eventId } = useParams();  
  const [quantity, setQuantity] = useState(1);

  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { id: eventId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading event</p>;

  const { name, description, venue, location, eventDate, eventTime, tags, price } = data.event;

  const handleAddToCart = () => {
    // Call the onAddToCart function passed from App.jsx
    onAddToCart(eventId, parseInt(quantity), price); // Ensure quantity is a number
  };

  return (
    <div className="eventContainer">
      <div className="event-page">
        <h1>{name}</h1>
        <p>{description}</p>
        <p><strong>Venue:</strong> {venue}</p>
        <p><strong>Address:</strong> {location}</p>
        <p><strong>Date:</strong> {eventDate}</p>
        <p><strong>Time:</strong> {eventTime}</p>
        <p><strong>Tags:</strong> {tags.join(', ')}</p>
        <p><strong>Price:</strong> ${price}</p>
        <div className="tickets">
          <label>
            Ticket Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />
          </label>
          
          <button className="button" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default EventPage;