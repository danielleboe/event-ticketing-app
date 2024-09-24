import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_CART } from '../utils/queries';
import { REMOVE_CART_ITEM } from '../utils/mutations';

const Cart = ({ userId }) => {
  console.log('Fetching cart for user ID:', userId); // Log user ID

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

  // Assign cartItems directly from the query data
  const cartItems = data?.user?.cart || [];

  const calculateTotalPrice = (quantity, price) => {
    return quantity * (price ?? 0);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + calculateTotalPrice(item.quantity, item.price), 0);
  };

  const calculateTaxes = (subtotal) => {
    const taxRate = 0.10; // 10% tax rate
    return subtotal * taxRate;
  };

  const calculateTotal = (subtotal, taxes) => {
    return subtotal + taxes;
  };

  const handleQuantityChange = (eventId, quantity) => {
    updateCartItemQuantity({
      variables: { userId, eventId, quantity },
      refetchQueries: [{ query: GET_USER_CART, variables: { id: userId } }],
    });
  };

  const handleRemoveItem = (eventId) => {
    removeCartItem({
      variables: { userId, eventId },
      refetchQueries: [{ query: GET_USER_CART, variables: { id: userId } }],
    });
  };

  // Calculate totals
  const subtotal = calculateSubtotal();
  const taxes = calculateTaxes(subtotal);
  const total = calculateTotal(subtotal, taxes);

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.eventId.id}>
              <h3><a href={item.eventId.url}>{item.eventId.name}</a></h3>
              <p>Item Price: ${item.price}</p>
              <p>
                Ticket Quantity: 
                <input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => handleQuantityChange(item.eventId.id, parseInt(e.target.value))} 
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
    </div>
  );
};

export default Cart;