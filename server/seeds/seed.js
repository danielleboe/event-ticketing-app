const db = require('../config/connection');
const { Users, Events, Order } = require('../models');  // Ensure this is correctly imported
const cleanDB = require('./cleanDB');
const userData = require('./userData.json');
const eventData = require('./eventData.json');  // Make sure this is correctly imported
const orderData = require('./orderData.json');


db.once('open', async () => {
  await cleanDB('Users', 'users');
  await cleanDB('Events', 'events');
  await cleanDB('Order', 'order');
  await Users.insertMany(userData);
  await Events.insertMany(eventData);
  await Order.insertMany(orderData);

  // await Users.save();
  // await Events.save();
  console.log('Data Seeding Complete');
  process.exit(0);
});