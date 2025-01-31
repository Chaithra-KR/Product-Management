const APIFeatures = require("../config/apiFeatures");
const AppError = require("../config/AppError");
const product = require("../models/product");
const fs = require('fs');
const path = require('path');

const addProduct = async (req, res) => {
  try {
    const { title, subcategory, description, variants, images } = req.body;

    // Parse variants if they come as a string
    const parsedVariants = Array.isArray(variants)
      ? variants
      : JSON.parse(variants);

    const imageFilenames = images.map((file) => file.filename);

    if (imageFilenames.length === 0) {
      return next(new AppError("At least one image is required", 400));
    }

    // Create a new product
    const newProduct = new product({
      title,
      subcategory,
      description,
      images: imageFilenames,
      variants: parsedVariants,
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Product = await product.findById(id).populate("subcategory");

    if (!Product) {
      return next(new AppError("No product found.", 404));
    }

    res.status(200).json({
      success: true,
      isAuthenticated: true,
      message: "Product retrieved successfully",
      data: Product,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total product count for pagination
    const totalCount = await product.countDocuments();

    const features = new APIFeatures(product, product.find(), req.query);

    // Apply filter, search, sorting, and pagination
    features.search().filter().sort();

    // Apply pagination
    features.query = features.query.skip(skip).limit(limit);

    const products = await features.query.populate("subcategory");

    if (!products || products.length === 0) {
      return next(new AppError("No product found.", 404));
    }

    res.status(200).json({
      success: true,
      isAuthenticated: true,
      message: "Products retrieved successfully",
      data: products,
      pagination: {
        totalItems: totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        limit: limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getFilteredProducts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Count total products
    const totalCount = await product.countDocuments();

    const { subcategoryIds } = req.query;
    console.log(subcategoryIds, "subcategoryIds");

    const subcategoryArray = subcategoryIds
      ? subcategoryIds.split(",").map((id) => id.trim())
      : [];

    // Fetch products with pagination
    const productList = await product
      .find({ subcategory: { $in: subcategoryArray } })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      isAuthenticated: true,
      message: "Products retrieved successfully",
      data: productList,
      pagination: {
        totalItems: totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        limit: limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {

    const { title, subcategory, description, variants, images } = req.body;
    const productId = req.params.id;

    // Check if the product exists
    const existingProduct = await product.findById(productId);
    if (!existingProduct) {
      return next(new AppError("Product not found", 404));
    }

    // Parse variants if they come as a string
    const parsedVariants = Array.isArray(variants)
      ? variants
      : JSON.parse(variants);

    const imageFilenames = images ? images.map((file) => file.filename) : [];

    if (imageFilenames.length === 0 && !existingProduct.images.length) {
      return next(new AppError("At least one image is required", 400));
    }

    // Get the old images that are no longer part of the product
    const imagesToRemove = existingProduct.images.filter(
      (image) => !imageFilenames.includes(image)
    );

    // Delete the old images from the file system
    imagesToRemove.forEach((image) => {
      const imagePath = path.join(__dirname, `../../uploads/${image}`);
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(`Failed to delete image: ${image}`, err);
          }
        });
      }
    });

    // Update product fields
    existingProduct.title = title || existingProduct.title;
    existingProduct.subcategory = subcategory || existingProduct.subcategory;
    existingProduct.description = description || existingProduct.description;
    existingProduct.variants = parsedVariants || existingProduct.variants;

    // Only update images if provided
    if (imageFilenames.length > 0) {
      existingProduct.images = imageFilenames;
    }

    // Save updated product
    await existingProduct.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: existingProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const uploadImage = async (req, res, next) => {
  try {
    console.log(req.files);
    res.status(200).json({
      success: true,
      isAuthenticated: true,
      data: req.files,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
  uploadImage,
  getProduct,
  getFilteredProducts,
};
