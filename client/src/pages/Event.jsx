import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENT } from '../utils/queries';
import { ADD_TO_CART } from '../utils/mutations';
import "../styles/Event.css";

const EventPage = ({ eventId }) => {
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { id: eventId },
  });
  
  const [quantity, setQuantity] = useState(1);
  const [addToCart] = useMutation(ADD_TO_CART);

  const handleAddToCart = async () => {
    try {
      await addToCart({
        variables: { eventId, quantity },
      });
      alert('Tickets added to cart!');
    } catch (err) {
      console.error(err);
      alert('Failed to add tickets to cart.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading event</p>;

  const { name, description, venue, address, date, time, tags, price } = data.event;

  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <p><strong>Venue:</strong> {venue}</p>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Time:</strong> {time}</p>
      <p><strong>Tags:</strong> {tags.join(', ')}</p>
      <p><strong>Price:</strong> ${price}</p>

      <div>
        <label>
          Ticket Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
        </label>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default EventPage;
