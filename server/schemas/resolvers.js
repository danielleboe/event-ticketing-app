const { Users, Events } = require('../models');

const resolvers = {
  Query: {
    users: async () => await Users.find(),
    user: async (parent, { id }) => await Users.findById(id),
    events: async () => await Events.find(),
    event: async (parent, { id }) => await Events.findById(id),
  },

  Mutation: {
    addUser: async (parent, args) => {
      const newUser = new Users(args);
      newUser.password = await bcrypt.hash(password, 10)
      return await newUser.save();
    },

    addToCart: async (parent, { userId, eventId }) => {
      const user = await Users.findById(userId);
      if (!user) throw new Error('User not found');
      if (!user.cart.includes(eventId)) {
        user.cart.push(eventId);
        await user.save();
      }
      return user;
    },

    removeFromCart: async (parent, { userId, eventId }) => {
      const user = await Users.findById(userId);
      if (!user) throw new Error('User not found');
      user.cart = Users.cart.filter(id => id.toString() !== eventId.toString());
      await user.save();
      return user;
    },

    purchaseCart: async (parent, { userId }) => {
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
    createdBy: async (parent) => await Users.findById(parent.createdBy),  // Use 'parent.createdBy'
  }
};

module.exports = resolvers;