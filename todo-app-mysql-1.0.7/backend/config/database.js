const mongoose = require('mongoose');

const serverSelectionTimeoutMS = 5000;

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('Missing MONGODB_URI environment variable');
  }

  // Prints "Failed 0", "Failed 1", "Failed 2" and then throws an
  // error. Exits after approximately 15 seconds.
  for (let i = 0; i < 3; ++i) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS
      });
      break;
    } catch (err) {
      console.log('Failed', i);
      if (i >= 2) {
        throw err;
      }
    }
  }
};

module.exports = {
  connectDB
};
