const express = require("express");
const {
  addProduct,
  getAllProducts,
  updateProduct,
  uploadImage,
  getProduct,
  getFilteredProducts,
} = require("../controllers/productController");
const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file, "file destination");
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    console.log(file, "file filename");
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({
  storage: storage,
});

const router = express.Router();
router.post("/upload-image", upload.array("images"), uploadImage);
router.post("/", addProduct);
router.get("/", getAllProducts);
router.get("/filter", getFilteredProducts); // to subcategory filter
router.get("/:id", getProduct);
router.patch("/:id", updateProduct);

module.exports = router;
