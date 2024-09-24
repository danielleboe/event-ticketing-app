// import { useMutation, gql } from '@apollo/client';
// import { loadStripe } from '@stripe/stripe-js';
// import 'dotenv/config';
// // const apiUrl = import.meta.env.VITE_API_URL;
// const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// const CREATE_CHECKOUT_SESSION = gql`
//   mutation CreateCheckoutSession($cart: [CartInput!]!) {
//     createCheckoutSession(cart: $cart) {
//       sessionId
//     }
//   }
// `;

// const CheckoutButton = ({ cart }) => {
//   const [createCheckoutSession] = useMutation(CREATE_CHECKOUT_SESSION);

//   const handleCheckout = async () => {
//     const { data } = await createCheckoutSession({
//       variables: { cart }
//     });

//     const stripe = await stripePromise;
//     stripe.redirectToCheckout({ sessionId: data.createCheckoutSession.sessionId });
//   };

//   return <button onClick={handleCheckout}>Checkout</button>;
// };

// export default CheckoutButton;


import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

const stripePromise = loadStripe(stripePublicKey);

const Checkout = ({ cartItems }) => {
    const handleCheckout = async () => {
        const stripe = await stripePromise;

        // Call your server to create a checkout session
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
        <div>
            <h1>Checkout</h1>
            <button role="link" onClick={handleCheckout}>
                Checkout
            </button>
        </div>
    );
};

export default Checkout;
