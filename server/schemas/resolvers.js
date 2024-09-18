const Event = require('../models/Event');

const resolvers = {
  Query: {
    events: async () => {
      return await Event.find();  // Fetch all events
    },
    searchEvents: async (_, { keyword }) => {
      return await Event.find({
        name: { $regex: keyword, $options: 'i' }  // Search by name (case-insensitive)
      });
    }
  }
};

module.exports = resolvers;
