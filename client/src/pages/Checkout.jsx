import { loadStripe } from "@stripe/stripe-js";
import "../styles/Checkout.css";

// import 'dotenv/config';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(stripePublicKey);
console.log("Stripe Public Key:", stripePublicKey); // Check the output

const Checkout = ({ cartItems }) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // Call your server to create a checkout session
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
    });

    const session = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <button role="link" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default Checkout;
