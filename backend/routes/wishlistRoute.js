const express = require("express");
const {
  removeFromWishlist,
  getWishlist,
  addWishlist,
  getWishlistById,
} = require("../controllers/wishlistController");

const router = express.Router();

router.post("/", addWishlist);
router.get("/", getWishlist);
router.get("/:id", getWishlistById);
router.delete("/:id", removeFromWishlist);

module.exports = router;
