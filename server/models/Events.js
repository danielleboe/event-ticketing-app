const { Schema, model } = require('mongoose');

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
    createdBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users'
      }
    ]
  },
  {
    timestamps: true, 
  }
);

const Events = model('events', eventsSchema);

module.exports = Events;
