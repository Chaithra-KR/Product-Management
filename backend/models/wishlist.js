const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PRODUCT",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("WISHLIST", wishlistSchema);
