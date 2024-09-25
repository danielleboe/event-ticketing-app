import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_CART } from '../utils/queries';
import { REMOVE_CART_ITEM, UPDATE_CART_ITEM_QUANTITY } from '../utils/mutations';
import { loadStripe } from '@stripe/stripe-js'; 
import { CREATE_CHECKOUT_SESSION } from '../utils/mutations';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Cart = ({ userId }) => {
  console.log('Fetching cart for user ID:', userId); // Log user ID

  const [createCheckoutSession] = useMutation(CREATE_CHECKOUT_SESSION);
  const { loading, error, data } = useQuery(GET_USER_CART, {
    variables: { id: userId },
    onCompleted: (data) => {
      console.log('Cart data received:', data);
    },
    onError: (error) => {
      console.error('Error fetching cart data:', error);
    },
  });

  const [updateCartItemQuantity] = useMutation(UPDATE_CART_ITEM_QUANTITY);
  const [removeCartItem] = useMutation(REMOVE_CART_ITEM);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const cartItems = data?.user?.cart || [];

  const calculateTotalPrice = (quantity, price) => quantity * (price ?? 0);
  
  const subtotal = cartItems.reduce((acc, item) => acc + calculateTotalPrice(item.quantity, item.price), 0);
  const taxes = subtotal * 0.10;
  const total = subtotal + taxes;

  const handleQuantityChange = (eventId, quantity) => {
    updateCartItemQuantity({
      variables: { userId, eventId, quantity },
      refetchQueries: [{ query: GET_USER_CART, variables: { _id: userId } }],
    });
  };

  const handleRemoveItem = (eventId) => {
    removeCartItem({
      variables: { userId, eventId },
      refetchQueries: [{ query: GET_USER_CART, variables: { _id: userId } }],
    });
  };

  const handleCheckout = async () => {
    try {
      const { data } = await createCheckoutSession({
        variables: { userId },
      });

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.createCheckoutSession.sessionId,
      });

      if (error) {
        console.error('Stripe checkout error:', error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.eventId._id}>
              <h3><a href={item.eventId.url}>{item.eventId.name}</a></h3>
              <p>Item Price: ${item.price}</p>
              <p>
                Ticket Quantity: 
                <input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => handleQuantityChange(item.eventId.id, Math.max(1, parseInt(e.target.value) || 1))} 
                  min="1" 
                />
              </p>
              <p>Total Price: ${calculateTotalPrice(item.quantity, item.price).toFixed(2)}</p>
              <button onClick={() => handleRemoveItem(item.eventId.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-summary">
        <h3>Summary</h3>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Taxes: ${taxes.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
      </div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;
