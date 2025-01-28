const jwt = require("jsonwebtoken");
const user = require("../models/user");
const AppError = require("../config/AppError");

const protect = async (req, res, next) => {
  try {
    let token;

    // Check if the token exists in the Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]; // Extract token from "Bearer <token>"
    }

    if (!token) {
      return next(new AppError("Unauthorized access. Token not found.", 401));
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user and attach it to the request object
    const currentUser = await user.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError("The user no longer exists.", 401));
    }

    // Pass the user data to the next middleware or route handler
    req.user = currentUser;
    next();
  } catch (error) {
    return next(new AppError("Unauthorized access. Invalid token.", 401));
  }
};

module.exports = { protect };
