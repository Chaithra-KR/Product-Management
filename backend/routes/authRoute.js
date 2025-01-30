const express = require("express");
const { signUp, login } = require("../controllers/authController");
const { protect } = require("../middleware/authHandler");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

//to check authentication status
router.get("/status", protect, (req, res) => {
  res.status(200).json({
    success: true,
    isAuthenticated: true,
  });
});
module.exports = router;
