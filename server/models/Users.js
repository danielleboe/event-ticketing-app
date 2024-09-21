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

<<<<<<< HEAD
// usersSchema.pre('save', async function (next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     console.log('Hashing password before saving');  // Debugging log
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }
//   next();
// });
=======
usersSchema.pre('save', async function (next) {
  console.log('Pre-save hook called');
  if (this.isNew || this.isModified('password')) {
    try {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
      console.log('Hashed password:', this.password);
    } catch (err) {
      console.error('Error hashing password:', err);
      return next(err);
    }
  }
  next();
});
>>>>>>> 41c8552ea6b22382d00019d62e8bc384427c10d3

// usersSchema.methods.isCorrectPassword = async function (password) {
//   console.log(`Password entered: ${password}`);  // Plain text entered
// console.log(`Hashed password in DB: ${user.password}`);  // Hashed password in DB
//   return bcrypt.compare(password, this.password);
// };

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;