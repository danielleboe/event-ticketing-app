// server/routes/checkout.js
const express = require('express');
const router = express.Router();
const stripe = require('../stripe'); // Your Stripe instance

router.post('/create-checkout-session', async (req, res) => {
  const cartItems = req.body.cartItems; // Assuming you're sending line items from the frontend

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      cart_items: cartItems,
      mode: 'payment',
      success_url: `http://localhost:3000/confirmation`,
      cancel_url: `http://localhost:3000/cancel`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
