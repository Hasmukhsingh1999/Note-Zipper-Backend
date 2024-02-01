const User = require("../models/user-model");

const createUser = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ error: "User Already Exists" });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
      profileImage,
    }).select("-password");

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      });
    } else {
      res.status(400).json({ error: "Error Occurred" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json({ result: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createUser };
