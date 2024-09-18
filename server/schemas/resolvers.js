const { Users, Events } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => await Users.find(),
    user: async (_, { _id }) => await Users.findById(id),
    events: async () => await Events.find().populate('createdBy'),
    event: async (_, { _id }) => await Events.findById(id).populate('createdBy'),
  },
  Mutation: {
 
    createUser: async (_, { username, email, password }) => {
      const user = await Users.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    
    loginUser: async (_, { email, password }) => {
      const user = await Users.findOne({ email });
      if (!user) {
        throw new Error('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error('Incorrect password');
      }

      const token = signToken(user);
      return { token, user };
    },

    loginUser: async (_, { email, password }) => {
      const user = await Users.findOne({ email });
      if (!user) {
        throw new Error('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error('Incorrect password');
      }

      const token = signToken(user);
      return { token, user };
    },

    addToCart: async (_, { userId, eventId }) => {
      const user = await Users.findById(userId);
      if (!user) throw new Error('User not found');
      if (!user.cart.includes(eventId)) {
        user.cart.push(eventId);
        await user.save();
      }
      return user;
    },
    removeFromCart: async (_, { userId, eventId }) => {
      const user = await Users.findById(userId);
      if (!user) throw new Error('User not found');
      user.cart = Users.cart.filter(id => _id.toString() !== eventId.toString());
      await user.save();
      return user;
    },
    purchaseCart: async (_, { userId }) => {
      const user = await Users.findById(userId);
      if (!user) throw new Error('User not found');
      const events = await Events.find({ _id: { $in: user.cart } });
      // Update purchaseHistory to include purchaseDate and event URL
      user.purchaseHistory = [
        ...user.purchaseHistory,
        ...user.cart.map(eventId => ({
          eventId,
          purchaseDate: new Date().toISOString()
        }))
      ];
      user.cart = [];
      await user.save();
      return user;
    },
    addEvent: async (_, args) => {
      const newEvent = new Event(args);
      return await newEvent.save();
    },
  },
  User: {
    // Update purchaseHistory resolver to include purchaseDate and event URL
    purchaseHistory: async (user) => await Events.find({ _id: { $in: user.purchaseHistory.map(p => p.eventId) } }).then(events => events.map(event => ({
      ...event.toObject(),
      purchaseDate: user.purchaseHistory.find(p => p.eventId.toString() === event._id.toString()).purchaseDate
    }))),
    createdEventHistory: async (user) => await Events.find({ _id: { $in: user.createdEventHistory } }),
    cart: async (user) => await Events.find({ _id: { $in: user.cart } }),
  },
  Event: {
    createdBy: async (event) => await Users.find({ _id: { $in: event.createdBy } }),
  }
};

module.exports = resolvers;
