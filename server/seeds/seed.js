const db = require('../config/connection');
const { Users, Events } = require('../models');  // Ensure this is correctly imported
const cleanDB = require('./cleanDB');
const userData = require('./userData.json');
const eventData = require('./eventData.json');  // Make sure this is correctly imported

db.once('open', async () => {
  await cleanDB('Users', 'users');
  await cleanDB('Events', 'events');
  await Users.insertMany(userData);
  await Events.insertMany(eventData);
  // await Users.save();
  // await Events.save();
  console.log('Data Seeding Complete');
  process.exit(0);
});