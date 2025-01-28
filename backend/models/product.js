const mongoose = require("mongoose");

const schema = mongoose.Schema;
const productSchema = new schema(
  {
    title: {
      type: String,
      required: [true, "Product title name is required"],
      unique: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SUBCATEGORY",
    },
    description: {
      type: String,
      required: [true, "Product must have a description"],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    variants: [
      {
        name: {
          type: String,
          required: [true, "Variant name is required"],
        },
        price: {
          type: Number,
          required: [true, "Variant price is required"],
          min: [0, "Variant price must be a positive number"],
        },
        qty: {
          type: String,
          required: [true, "Variant quantity is required"],
          min: [0, "Variant quantity cannot be less than zero"],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PRODUCT", productSchema);
