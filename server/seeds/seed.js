// const db = require('../config/connection');
// const { Users, Events } = require('../models');
// const cleanDB = require('./cleanDB');
// const userData = require('./userData.json');
// const eventData = require('./eventData.json');

// db.once('open', async () => {
//   await cleanDB('Users', 'users');
//   await cleanDB('Events', 'events');
//   await Users.insertMany(userData);
//   await Events.insertMany(eventData);
//   console.log('Data Seeding Complete');
//   process.exit(0);
// });

// // Insert seed data into the database
// const seedDatabase = async () => {
//   try {
//     // Clear existing events (optional)
//     await Event.deleteMany({});

//     // Insert new event data
//     await Event.insertMany(events);
//     console.log("Database seeded successfully!");

//     // Close the connection after seeding
//     mongoose.connection.close();
//   } catch (err) {
//     console.error("Error seeding the database:", err);
//     mongoose.connection.close();
//   }
// };

// seedDatabase();


const db = require('../config/connection');
const { Users, Events } = require('../models');  // Ensure this is correctly imported
const cleanDB = require('./cleanDB');
const userData = require('./userData.json');
const eventData = require('./eventData.json');  // Make sure this is correctly imported

db.once('open', async () => {
  try {
    // Clean existing data
    await cleanDB('Users', 'users');   // Assumes cleanDB works with collection names
    await cleanDB('Events', 'events');

    // Insert seed data for users and events
    await Users.insertMany(userData);
    await Events.insertMany(eventData);

    console.log('Data Seeding Complete');
    process.exit(0);  // Exit process after seeding
  } catch (err) {
    console.error("Error during database seeding:", err);
    process.exit(1);  // Exit with failure status code if an error occurs
  }
});

// Remove this duplicate seedDatabase function
