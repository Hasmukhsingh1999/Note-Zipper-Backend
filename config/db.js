const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    // Validate required environment variables
    if (!process.env.MONGO_URL) {
      console.error("Missing MONGO_URL in environment variables.");
      process.exit(1);
    }

    // Connection options
    const options = {
      autoIndex: true,
      retryWrites: true,
      // Add more options as needed
    };

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL, options);

    // Connection pooling
    // const { MongoClient } = require('mongodb');
    // const client = new MongoClient(process.env.MONGO_URL, { poolSize: 10 });
    // await client.connect();

    // Logging
    console.log("Database connected");

    // Logger configuration (using winston)
    // const winston = require('winston');
    // const logger = winston.createLogger({
    //   transports: [
    //     new winston.transports.Console(),
    //     // Add more transports as needed (file, database, etc.)
    //   ],
    // });
    // logger.info('Database connected');
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process in case of a connection failure
  }
};

module.exports = { connectDB };
