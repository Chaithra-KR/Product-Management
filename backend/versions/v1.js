const express = require("express");
const authRoute = require("../routes/authRoute");
const categoryRoute = require("../routes/categoryRoute");
const subCategoryRoute = require("../routes/subCategoryRoute");
const { protect } = require("../middleware/authHandler");

const router = express.Router();

// unauthenticated routes
router.use("/auth", authRoute);

router.use(protect);
// authenticated routes
router.use("/category", categoryRoute);
router.use("/subcategory", subCategoryRoute);

module.exports = router;
