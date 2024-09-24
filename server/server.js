const express = require('express');
// Use ApolloServer from apollo-server-express
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./schemas'); // Import resolvers
const path = require('path');
const db = require('./config/connection');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');

require('dotenv').config()

const PORT = process.env.PORT || 3001;
const app = express();

//Stripe
app.use(bodyParser.json());

app.post('/create-payment-intent', async (req, res) => {
  const { paymentMethodId, amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });

    res.send({ success: true, paymentIntent });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
const startApolloServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers }); // Moved server initialization before calling `start()`
  
  await server.start(); // Wait for ApolloServer to start
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Apply Apollo middleware to the express app
  server.applyMiddleware({ app });

  // If we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`GraphQL endpoint at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Call to start the Apollo server
startApolloServer();