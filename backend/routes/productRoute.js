const express = require("express");
const {
  addProduct,
  getAllProducts,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", addProduct);
router.get("/", getAllProducts);
router.patch("/:id", updateProduct);

module.exports = router;
