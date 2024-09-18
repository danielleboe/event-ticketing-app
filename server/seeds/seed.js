// const db = require('../config/connection');
// const cleanDB = require('./cleanDB');

// const techData = require('./techData.json');

// db.once('open', async () => {
//   await cleanDB('Tech', 'teches');

//   await Tech.insertMany(techData);

//   console.log('Technologies seeded!');
//   process.exit(0);
// });

const mongoose = require('mongoose');
const Event = require('./models/Event');  // Assuming Event model is defined in models/Event.js

// Sample event data
const events = [
  {
    name: "Music Festival 2024",
    location: "Central Park, New York",
    date: "2024-06-20",
    price: 120.50
  },
  {
    name: "Stand-up Comedy Night",
    location: "Comedy Club, Los Angeles",
    date: "2024-07-15",
    price: 45.00
  },
  {
    name: "Art Exhibition",
    location: "Modern Art Museum, San Francisco",
    date: "2024-08-05",
    price: 25.00
  },
  {
    name: "Tech Conference",
    location: "Silicon Valley, California",
    date: "2024-09-12",
    price: 300.00
  },
  {
    name: "Jazz Concert",
    location: "Downtown Theater, Chicago",
    date: "2024-09-30",
    price: 75.00
  }
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/event-ticketing', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Insert seed data into the database
const seedDatabase = async () => {
  try {
    // Clear existing events (optional)
    await Event.deleteMany({});

    // Insert new event data
    await Event.insertMany(events);
    console.log("Database seeded successfully!");

    // Close the connection after seeding
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding the database:", err);
    mongoose.connection.close();
  }
};

seedDatabase();
