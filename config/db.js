const { default: mongoose } = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      autoIndex: true,
      retryWrites: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
