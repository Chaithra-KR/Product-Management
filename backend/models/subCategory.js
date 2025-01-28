const mongoose = require("mongoose");

const schema = mongoose.Schema;
const subCategorySchema = new schema(
  {
    name: {
      type: String,
      required: [true, "Sub Category name is required"],
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CATEGORY",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SUBCATEGORY", subCategorySchema);
