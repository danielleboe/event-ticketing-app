import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENT } from '../utils/queries';
import { ADD_TO_CART } from '../utils/mutations';
import { useParams } from 'react-router-dom';  // Import useParams
import "../styles/Event.css";
// import concertImage from '../assets/concert.png'; // Adjust the path as necessary
import festivalImage from '../assets/speaker.jpg'; // Adjust the path as necessary


const EventPage = () => {
  const { id: eventId } = useParams();  // Extract eventId from URL params
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
      console.log(`handleaddtocart`, eventId,quantity );
      alert('Tickets added to cart!');
    } catch (err) {
      console.error(err);
      alert('Failed to add tickets to cart.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading event</p>;

  const { name, description, venue, location, eventDate, eventTime, tags, price } = data.event;

  return (
    <div className="eventContainer">
      <img className="heroImage" src={festivalImage} alt="Concert"/>
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
