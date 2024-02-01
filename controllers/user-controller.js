const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (userId) => {
  // Create a JWT token with the user ID as the payload
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, profileImage,role } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: "User Already Exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImage,
      role,
    });
    console.log(user);
    const token = createToken(user._id);
    if (user) {
      // Return a sanitized user object without the password field
      const sanitizedUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        token: createToken(user._id),
      };

      res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
      return res.status(201).json({ success: true, user: sanitizedUser });
    } else {
      return res.status(400).json({ error: "Error Occurred" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (user) {
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Password is valid, create and return a JWT token
        const token = createToken(user._id);
        res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
        return res
          .status(200)
          .json({ success: true, token, message: "Login successful" });
      } else {
        // Password is invalid
        return res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      // User not found
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(200).json({ success: true, message: "Logout successful" });
  }
};

const getAllUser = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Return the list of users
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createUser, loginUser, logout, getAllUser };
