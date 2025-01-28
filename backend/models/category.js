const mongoose = require("mongoose");

const schema = mongoose.Schema;
const categorySchema = new schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CATEGORY", categorySchema);
