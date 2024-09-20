const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/stagepass_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useFindAndModify: false, // Ensure this option is set to false
});

module.exports = mongoose.connection;