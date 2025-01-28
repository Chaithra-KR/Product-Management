const AppError = require("../config/AppError");
const subCategory = require("../models/subCategory");

const addSubCategory = async (req, res, next) => {
  try {
    const { name, categoryId } = req.body;

    // Check if the subcategory already exists
    const existingSubCategory = await subCategory.findOne({ name });
    if (existingSubCategory) {
      return next(
        new AppError(`${name} named subcategory is already exist`, 400)
      );
    }

    // Create and save the new subcategory
    const newSubCategory = new subCategory({
      name,
      category: categoryId,
    });

    await newSubCategory.save().catch((error) => {
      if (error.name === "ValidationError") {
        return next(new AppError(error.message, 400));
      }
      return next(new AppError("Failed to save the subcategory.", 500));
    });

    res.status(201).json({
      success: true,
      message: `Added new subcategory named ${name}`,
    });
  } catch (error) {
    next(error); // Pass errors to the error handling middleware
  }
};

const getAllSubCategories = async (req, res, next) => {
  try {
    const subCategories = await category.find();

    if (!subCategories || subCategories.length === 0) {
      return next(new AppError("No subcategories found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Subcategories retrieved successfully",
      data: subCategories,
    });
  } catch (error) {
    next(new AppError("Failed to fetch categories", 500));
  }
};

module.exports = { addSubCategory, getAllSubCategories };
