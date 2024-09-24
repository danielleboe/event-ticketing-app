import { useMutation, gql } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';
import 'dotenv/config';
// const apiUrl = import.meta.env.VITE_API_URL;
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

const CREATE_CHECKOUT_SESSION = gql`
  mutation CreateCheckoutSession($cart: [CartInput!]!) {
    createCheckoutSession(cart: $cart) {
      sessionId
    }
  }
`;

const CheckoutButton = ({ cart }) => {
  const [createCheckoutSession] = useMutation(CREATE_CHECKOUT_SESSION);

  const handleCheckout = async () => {
    const { data } = await createCheckoutSession({
      variables: { cart }
    });

    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId: data.createCheckoutSession.sessionId });
  };

  return <button onClick={handleCheckout}>Checkout</button>;
};

export default CheckoutButton;
