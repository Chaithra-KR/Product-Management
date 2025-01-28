const AppError = require("../config/AppError");
const category = require("../models/category");

const addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    // Validate input
    if (!name) {
      return next(new AppError("Name is required", 400));
    }

    // Check if the category already exists
    const existingCategory = await category.findOne({ name });
    if (existingCategory) {
      return next(new AppError(`${name} category is already exist`, 400));
    }

    // Create and save the new category
    const newCategory = new category({
      name,
    });

    await newCategory.save().catch((error) => {
      if (error.name === "ValidationError") {
        return next(new AppError(error.message, 400));
      }
      return next(new AppError("Failed to save the Category.", 500));
    });

    res.status(201).json({
      success: true,
      message: `Added new category named ${name}`,
    });
  } catch (error) {
    next(error); // Pass errors to the error handling middleware
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await category.find();

    if (!categories || categories.length === 0) {
      return next(new AppError("No categories found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    next(new AppError("Failed to fetch categories", 500));
  }
};

module.exports = { addCategory, getAllCategories };
