const mongoose = require("mongoose");
// const config = require("config");
process.env.NODE_ENV = "development";
require('dotenv').config();
const db = process.env.MONGODB_URI;
// const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log("MongoDB Connected!");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;