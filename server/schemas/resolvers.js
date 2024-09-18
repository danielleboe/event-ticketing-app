const { Users, Events } = require('../models');

const resolvers = {
  Query: {
    users: async () => await Users.find(),
    user: async (_, { id }) => await Users.findById(id),
    events: async () => await Events.find(),
    event: async (_, { id }) => await Events.findById(id),
  },
  Mutation: {
    addUser: async (_, args) => {
      const newUser = new Users(args);
      return await newUser.save();
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
      user.cart = Users.cart.filter(id => id.toString() !== eventId.toString());
      await user.save();
      return user;
    },
    purchaseCart: async (_, { userId }) => {
      const user = await Users.findById(userId);
      if (!user) throw new Error('User not found');
      const events = await Events.find({ _id: { $in: user.cart } });
      user.purchaseHistory = [...Users.purchaseHistory, ...Users.cart];
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
    purchaseHistory: async (user) => await Events.find({ _id: { $in: Users.purchaseHistory } }),
    createdEventHistory: async (user) => await Events.find({ _id: { $in: Users.createdEventHistory } }),
    cart: async (user) => await Events.find({ _id: { $in: Users.cart } }),
  },
  Event: {
    createdBy: async (event) => await Users.find({ _id: { $in: Events.createdBy } }),
  }
};

module.exports = resolvers;
