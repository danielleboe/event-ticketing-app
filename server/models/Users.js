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
    cart: [
      {
        eventId: {
          type: Schema.Types.ObjectId,
          ref: 'Events',
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
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
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;