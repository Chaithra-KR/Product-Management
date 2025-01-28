const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../config/AppError");

const signUp = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // Input validation
    if (!email || !password) {
      return next(new AppError("Email and password are required.", 400));
    }

    if (password.length < 6) {
      return next(
        new AppError("Password must be at least 6 characters long.", 400)
      );
    }

    // Check if the email already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return next(new AppError("Email is already registered.", 400));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new user({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user and handle errors
    try {
      await newUser.save();
    } catch (error) {
      if (error) {
        return next(new AppError(error.message, 400));
      }
      return next(new AppError("Failed to save the user.", 500));
    }

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Respond with success
    res.status(201).json({
      success: true,
      message: `Welcome ${name}!`,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const User = await user.findOne({ email });
    if (!User) {
      return next(new AppError("User not found", 404));
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }

    // Generate JWT token
    const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    next(new AppError("Server error, please try again later.", 500));
  }
};

module.exports = { signUp, login };
