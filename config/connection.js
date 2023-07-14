const { connect, connection } = require('mongoose');

//creates connection to MongoDB
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB';

//connects the MongoDB connection string
connect(connectionString);

module.exports = connection;