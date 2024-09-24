const { Users, Events, Order } = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    users: async () => await Users.find(),
    user: async (_, { _id }) => await Users.findById(_id),

    events: async () => await Events.find().populate("createdBy"),
    event: async (_, { id }) => {
      try {
        const event = await Events.findById(id).populate("createdBy");
        if (!event) {
          throw new Error("Event not found");
        }
        return event;
      } catch (error) {
        console.error("Error fetching event:", error);
        throw new Error("Could not fetch event");
      }
    },
  },

  Mutation: {
    createUser: async (_, { username, email, password }) => {
      // Check if the user already exists
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists with this email");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Hashed Password:", hashedPassword); // Debug log
      // Create the new user
      const newUser = await Users.create({
        username,
        email,
        password: hashedPassword,
      });

      // Generate a token
      const token = signToken(newUser);

      return {
        token,
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      };
    },

    loginUser: async (_, { email, password }) => {
      // Find the user by email
      const user = await Users.findOne({ email });
      if (!user) {
        throw new Error("No user found with this email");
      }
      console.log(`loginpasswordcompare`, password, user.password);
      console.log(`Entered password: ${password}`); // Log plain password
      console.log(`Hashed password in DB: ${user.password}`); // Log hashed password in the DB
      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(`Password match: ${isMatch}`); // Check if bcrypt comparison works
      if (!isMatch) {
        throw new Error("Invalid password");
      }

      // Generate a token
      const token = signToken(user);

      return {
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      };
    },

    addToCart: async (_, { userId, eventId, quantity }, { User }) => {
      const user = await Users.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
    
      const cartItem = user.cart.find(item => item.eventId.toString() === eventId);
      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        user.cart.push({ eventId, quantity });
      }
    
      await user.save();
      return user;
    },
    

    removeFromCart: async (parent, { _id, eventId, quantity  }) => {
      const user = await Users.findById(_id);
      if (!user) throw new Error("User not found");
      user.cart = user.cart.filter(
        (id) => _id.toString() !== eventId.toString()
      );
      await user.save();
      return user;
    },

    purchaseCart: async (parent, { _id }) => {
      const user = await Users.findById(_id);
      if (!user) throw new Error("User not found");
      const events = await Events.find({ _id: { $in: user.cart } });
      // Update purchaseHistory to include purchaseDate and event URL
      user.purchaseHistory = [
        ...user.purchaseHistory,
        ...user.cart.map((eventId) => ({
          eventId,
          purchaseDate: new Date().toISOString(),
        })),
      ];
      user.cart = [];
      await user.save();
      return user;
    },

    createPaymentIntent: async (_, { amount }, context) => {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount, // amount in cents
          currency: 'usd',
        });
        return {
          clientSecret: paymentIntent.client_secret,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

// After session is completed
saveOrder: async (_, { orderInput }) => {
  // Destructure the values you need from orderInput
  const { userId, items, totalAmount } = orderInput;

  // Create a new order object
  const order = new Order({
    userId,
    items,
    totalAmount,
    paymentStatus: 'Paid',
  });

  // Save the order to the database
  await order.save();

  return order; // Optionally return the saved order
},



    addEvent: async (_, args) => {
      console.log('Received args:', args);
      try {
        const event = new Events(args);
        await event.save();
        return event;
      } catch (err) {
        console.error('Error adding event:', err);
        throw new Error('Failed to add event');
      }
    },
    updateEvent: async (parent, args) => {
      console.log('Received args:', args); // Log the received arguments
      try {
        const updatedEvent = await Events.findByIdAndUpdate(
          args.id,
          { $set: args },
          { new: true, runValidators: true }
        );
        console.log('Updated event:', updatedEvent); // Log the updated event
        return updatedEvent;
      } catch (err) {
        throw new Error('Error updating event: ' + err.message);
      }
    },
    deleteEvent: async (parent, { id }) => {
      try {
        await Events.findByIdAndDelete(id);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    createCheckoutSession: async (_, { cart }, { user }) => {
      // Create line items from the user's cart
      const cartItems = cart.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.eventName,
          },
          unit_amount: item.price * 100, // Price in cents
        },
        quantity: item.quantity,
      }));

      // Create the Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        cart_items: cartItems,
        mode: 'payment',
        success_url: `http://localhost:3000/confirmation`,
        cancel_url: `http://localhost:3000/cancel`,
      });

      return {
        sessionId: session.id
      };
    },

    


    
},

  User: {
    // Update purchaseHistory resolver to include purchaseDate and event URL
    purchaseHistory: async (user) =>
      await Events.find({
        _id: { $in: user.purchaseHistory.map((p) => p.eventId) },
      }).then((events) =>
        events.map((event) => ({
          ...event.toObject(),
          purchaseDate: user.purchaseHistory.find(
            (p) => p.eventId.toString() === event._id.toString()
          ).purchaseDate,
        }))
      ),
    createdEventHistory: async (user) =>
      await Events.find({ _id: { $in: user.createdEventHistory } }),
    cart: async (user) => await Events.find({ _id: { $in: user.cart } }),
  },

  Event: {
    createdBy: async (parent) => await Users.findById(parent.createdBy),  // Use 'parent.createdBy'
  }
};

module.exports = resolvers;