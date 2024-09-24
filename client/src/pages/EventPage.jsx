import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENT } from '../utils/queries';
import { UPDATE_CART_ITEM_QUANTITY } from '../utils/mutations';
import { useParams } from 'react-router-dom';  // Import useParams
import "../styles/Event.css";


const EventPage = () => {
  const { id: eventId } = useParams();  // Extract eventId from URL params
  const [quantity, setQuantity] = useState(1);

  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { id: eventId },
  });
  
  // const [quantity, setQuantity] = useState(1);
  // const [addToCart] = useMutation(UPDATE_CART_ITEM_QUANTITY);


  const [addToCart] = useMutation(ADD_TO_CART, {
    onCompleted: () => {
      console.log(`Added ${quantity} tickets for event ${eventId} to cart.`);
      // Optionally, you could trigger any success notifications here
    },
    onError: (err) => {
      console.error('Error adding to cart:', err);
    },
  });

  const handleAddToCart = () => {
    addToCart({ variables: { eventId, quantity } }); // Call the mutation with eventId and quantity
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading event</p>;

  const { name, description, venue, location, eventDate, eventTime, tags, price } = data.event;

  return (
    <div className="eventContainer">
      {/* <img className="heroImage" src={festivalImage} alt="Concert"/> */}
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
