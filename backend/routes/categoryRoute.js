const express = require("express");
const {
  addCategory,
  getAllCategories,
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/", addCategory);
router.get("/", getAllCategories);
// router.get("/:id", getCategory);
// router.patch("/:id", updateCategory);
// router.delete("/:id", deleteCategory);

module.exports = router;
