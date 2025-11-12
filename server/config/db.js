const mongoose = require('mongoose');
const db = 'mongodb+srv://aleezegneni_db_user:123456A@cluster0.vcg6dxb.mongodb.net/?appName=Cluster0'

// Connection to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
