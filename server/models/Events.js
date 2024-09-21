const mongoose = require('mongoose');  // Add this line
const { Schema } = mongoose;  // You can still destructure Schema from mongoose

const eventsSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    venue: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    eventDate: {
      type: String,
      required: true
    },
    eventTime: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: false
    },
    createdBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
      }
    ],

  },
  {
    timestamps: true, 
  }
);

const Events = mongoose.model('Events', eventsSchema);

module.exports = Events;