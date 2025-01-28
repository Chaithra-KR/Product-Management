const express = require("express");
const { addSubCategory, getAllSubCategories } = require("../controllers/subCategoryController");

const router = express.Router();

router.post("/", addSubCategory);
router.get("/", getAllSubCategories);

module.exports = router;
