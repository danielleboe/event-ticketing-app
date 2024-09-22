import { useState } from 'react';

const Ticket = ({ ticketId, ticketName, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(ticketId, quantity);
    setQuantity(1); // Reset quantity after adding
  };

  return (
    <div>
       <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
      <button  onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Ticket;
