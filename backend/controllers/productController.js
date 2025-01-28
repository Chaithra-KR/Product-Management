const APIFeatures = require("../config/apiFeatures");
const AppError = require("../config/AppError");
const product = require("../models/product");

const addProduct = async (req, res, next) => {
  try {
    const { title, subcategory, description, variants } = req.body;

    // Validate required fields
    if (!title || !subcategory || !description || !variants) {
      return next(new AppError("All fields are required", 400));
    }

    // Log the variants to check the data
    console.log("Received variants:", variants);

    // Check if variants is an array and has at least one variant
    if (!Array.isArray(variants) || variants.length === 0) {
      return next(
        new AppError("Variants must be an array with at least one variant", 400)
      );
    }

    // Check for missing fields in each variant
    for (const variant of variants) {
      if (!variant.name || !variant.price || variant.qty === undefined) {
        return next(
          new AppError(
            "Each variant must have a name, price, and quantity",
            400
          )
        );
      }
    }

    // Check if the product already exists by title and subcategory
    const existingProduct = await product.findOne({ title, subcategory });
    if (existingProduct) {
      return next(new AppError(`${title} product already exists`, 400));
    }

    // Check if files (images) were uploaded
    if (!req.files || !req.files.images || req.files.images.length === 0) {
      return next(new AppError("At least one image is required", 400));
    }

    const images = req.files.images;
    const imagePaths = [];

    // Loop through images and save them
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const uploadPath = `./uploads/${image.name}`;

      // Move image to upload directory
      await image.mv(uploadPath, (err) => {
        if (err) {
          return next(new AppError("Failed to upload image", 500));
        }
      });

      imagePaths.push(uploadPath);
    }

    // Create and save the new product
    const newProduct = new product({
      title,
      subcategory,
      description,
      images: imagePaths,
      variants,
    });

    await newProduct.save().catch((error) => {
      if (error.name === "ValidationError") {
        return next(new AppError(error.message, 400));
      }
      return next(new AppError("Failed to save the product.", 500));
    });

    res.status(201).json({
      success: true,
      message: `Added new product named ${title}`,
    });
  } catch (error) {
    next(error); // Pass errors to the global error handling middleware
  }
};

// const getAllProducts = async (req, res, next) => {
//   try {
//     const products = await product.find().populate("subcategory");

//     if (!products || products.length === 0) {
//       return next(new AppError("No product found.", 404));
//     }

//     res.status(200).json({
//       success: true,
//       message: "Products retrieved successfully",
//       data: products,
//     });
//   } catch (error) {
//     next(new AppError("Failed to fetch products", 500));
//   }
// };

const getAllProducts = async (req, res, next) => {
  try {
    const features = new APIFeatures(product, product.find(), req.query);

    // Apply filter, search, and pagination functionalities

    features
      .search()
      .filter()
      .sort()
      .paginate(await product.countDocuments());

    // Execute the query
    const products = await features.query.populate("subcategory");

    if (!products || products.length === 0) {
      return next(new AppError("No product found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params; // Get id from the URL params
    const { title, subcategory, description, variants } = req.body;

    // Validate required fields
    if (!title || !subcategory || !description || !variants) {
      return next(new AppError("All fields are required", 400));
    }

    // Log the variants to check the data
    console.log("Received variants:", variants);

    // Check if variants is an array and has at least one variant
    if (!Array.isArray(variants) || variants.length === 0) {
      return next(
        new AppError("Variants must be an array with at least one variant", 400)
      );
    }

    // Check for missing fields in each variant
    for (const variant of variants) {
      if (!variant.name || !variant.price || variant.qty === undefined) {
        return next(
          new AppError(
            "Each variant must have a name, price, and quantity",
            400
          )
        );
      }
    }

    // Find the product by ID
    const existingProduct = await product.findById(id);
    if (!existingProduct) {
      return next(new AppError("Product not found", 404));
    }

    // Handle image updates
    let imagePaths = [...existingProduct.images]; // Start with existing images

    if (req.files && req.files.images && req.files.images.length > 0) {
      // Delete old images that are not part of the new set
      const fs = require("fs");
      const newImages = req.files.images;

      // Remove old images from the server
      for (const oldImagePath of existingProduct.images) {
        if (
          !newImages.some((img) => `./uploads/${img.name}` === oldImagePath)
        ) {
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); // Remove old image from the server
          }
        }
      }

      // Process new images
      for (let i = 0; i < newImages.length; i++) {
        const image = newImages[i];
        const uploadPath = `./uploads/${image.name}`;

        // Move image to upload directory
        await image.mv(uploadPath, (err) => {
          if (err) {
            return next(new AppError("Failed to upload image", 500));
          }
        });

        // Add new images to the imagePaths array
        if (!imagePaths.includes(uploadPath)) {
          imagePaths.push(uploadPath);
        }
      }
    }

    // Handle variants updates (adding new, removing old)
    if (variants) {
      // If there are variants provided, update the product with the new list
      existingProduct.variants = variants;
    }

    // Update product fields
    existingProduct.title = title;
    existingProduct.subcategory = subcategory;
    existingProduct.description = description;
    existingProduct.images = imagePaths; // Update images
    existingProduct.variants = variants; // Update variants

    // Save the updated product
    await existingProduct.save().catch((error) => {
      if (error.name === "ValidationError") {
        return next(new AppError(error.message, 400));
      }
      return next(new AppError("Failed to update the product.", 500));
    });

    res.status(200).json({
      success: true,
      message: `Product updated successfully!`,
    });
  } catch (error) {
    next(error); // Pass errors to the global error handling middleware
  }
};

module.exports = { addProduct, getAllProducts, updateProduct };
