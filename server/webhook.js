// Server-side: Example of how you can verify the session without a webhook
router.post('/complete-order', async (req, res) => {
  const { sessionId } = req.body;
  
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      // Save order details in your database
      const order = new Order({
        userId: session.client_reference_id,
        items: session.cart_items,
        totalAmount: session.amount_total,
        paymentStatus: 'Paid',
      });
      await order.save();

      res.json({ success: true });
    } else {
      res.status(400).json({ error: 'Payment not completed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
