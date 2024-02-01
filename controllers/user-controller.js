const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;
    
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
    });

    if (user) {
      // Return a sanitized user object without the password field
      const sanitizedUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      };

      return res.status(201).json(sanitizedUser);
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
        // Password is valid, proceed with login logic
        return res.status(200).json({ message: "Login successful" });
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

const getAllUser = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Return the list of users
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createUser, loginUser, getAllUser };
