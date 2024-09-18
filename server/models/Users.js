const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
        type: Schema.Types.ObjectId,
        ref: 'Events'
      }
    ],
  },
  {
    timestamps: true,
  }
);

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

usersSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Users = model('users', usersSchema);

module.exports = Users;