const mongoose = require('mongoose');  // Add this line
const { Schema } = mongoose;  // You can still destructure Schema from mongoose

const usersSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Invalid Email!  Please enter a valid email."], 
    },
    password: {
      type: String,
      required: true
    },
    purchaseHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Events'
      }
    ],
    createdEventHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Events'
      }
    ],
    cart: [
      {
        eventId: {
          type: Schema.Types.ObjectId,
          ref: 'Event',  // Assuming you have an Event model
        },
        quantity: {
          type: Number,
          default: 1,   // Default quantity is 1
        },
      },
    ]
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;