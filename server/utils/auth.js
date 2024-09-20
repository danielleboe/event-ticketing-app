const jwt = require('jsonwebtoken');
require('dotenv').config()

const secret = 'mysecretsshhhhh';
const expiration = '2h';

const signToken = ({ username, email, _id }) => {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  };

// Function to generate a token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Adjust as needed
  });
};

module.exports = { generateToken, signToken };