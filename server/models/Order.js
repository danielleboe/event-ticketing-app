const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users", // Reference to the User model
    required: true,
  },
  items: [
    {
      eventId: {
        type: Schema.Types.ObjectId,
        ref: "Events", // Reference to the Event model
        required: false,
      },
      quantity: {
        type: Number,
        required: false,
      },
      price: {
        type: Number,
        required: false, // Price at the time of order
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: false,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },

},
{
  timestamps: true,
}


);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
