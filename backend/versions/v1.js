const express = require("express");
const authRoute = require("../routes/authRoute");
const categoryRoute = require("../routes/categoryRoute");
const subCategoryRoute = require("../routes/subCategoryRoute");
const productRoute = require("../routes/productRoute");
const wishlistRoute = require("../routes/wishlistRoute");

const { protect } = require("../middleware/authHandler");

const router = express.Router();

// unauthenticated routes
router.use("/auth", authRoute);

router.use(protect);
// authenticated routes
router.use("/category", categoryRoute);
router.use("/subcategory", subCategoryRoute);
router.use("/product", productRoute);
router.use("/wishlist", wishlistRoute);

module.exports = router;
