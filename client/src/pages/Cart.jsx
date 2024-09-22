const Cart = ({ cart }) => {
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
      </div>
    );
  };
  
  export default Cart;
  