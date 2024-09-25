import Cart from '../components/Cart';
import { useParams } from 'react-router-dom';

const CartPage = () => {
  const { userId } = useParams();
  console.log("User ID:", userId); // Add this line to log the userId

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <Cart userId={userId} />
    </div>
  );
};

export default CartPage;