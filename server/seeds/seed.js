const db = require('../config/connection');
const { Users, Events } = require('../models');
const cleanDB = require('./cleanDB');
const userData = require('./userData.json');
const eventData = require('./eventData.json');

db.once('open', async () => {
  await cleanDB('Users', 'users');
  await cleanDB('Events', 'events');
  await Users.insertMany(userData);
  await Events.insertMany(eventData);
  console.log('Data Seeding Complete');
  process.exit(0);
});
