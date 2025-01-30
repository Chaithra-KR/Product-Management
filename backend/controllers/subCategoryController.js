const APIFeatures = require("../config/apiFeatures");
const AppError = require("../config/AppError");
const subCategory = require("../models/subCategory");

const addSubCategory = async (req, res, next) => {
  try {
    const { name, categoryId } = req.body;

    // Validate input fields
    if (!name || !categoryId) {
      return next(new AppError("Name and categoryId are required fields", 400));
    }

    // Check if the subcategory already exists
    const existingSubCategory = await subCategory.findOne({ name });
    if (existingSubCategory) {
      return next(
        new AppError(`${name} named subcategory already exists`, 400)
      );
    }

    const newSubCategory = new subCategory({
      name,
      category: categoryId,
    });

    await newSubCategory.save();

    return res.status(201).json({
      success: true,
      isAuthenticated: true,
      message: `Added new subcategory named ${name}`,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllSubCategories = async (req, res, next) => {
  try {
    const apiFeatures = new APIFeatures(
      subCategory,
      subCategory.find().populate("category"),
      req.query
    )
      .filter()
      .sort()
      .paginate();

    const subCategories = await apiFeatures.query;

    if (!subCategories || subCategories.length === 0) {
      return next(new AppError("No subcategories found.", 404));
    }

    res.status(200).json({
      success: true,
      isAuthenticated: true,
      message: "Subcategories retrieved successfully",
      data: subCategories,
    });
  } catch (error) {
    next(new AppError("Failed to fetch subcategories", 500));
  }
};
module.exports = { addSubCategory, getAllSubCategories };
