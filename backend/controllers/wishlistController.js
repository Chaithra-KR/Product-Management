const Wishlist = require("../models/wishlist");
const Product = require("../models/product");
const AppError = require("../config/AppError");

//  Add product to wishlist
const addWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    // Check if product exists
    const product = await Product.findById(productId);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [productId] });
    } else {
      if (wishlist.products.includes(productId)) {
        return next(new AppError("Product already in wishlist", 400));
      }
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.status(201).json({
      success: true,
      isAuthenticated: true,
      message: "Product added to wishlist",
      wishlist,
      isInWishlist: true,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

//  Get user's wishlist
const getWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "products"
    );
    console.log(wishlist, "wishlist");

    if (!wishlist) {
      return res
        .status(201)
        .json({ status: true, isAuthenticated: true, data: [] });
    }

    res.status(200).json({
      success: true,
      isAuthenticated: true,
      data: wishlist,
      message: "Categories retrieved successfully",
    });
  } catch (error) {
    return next(new AppError("Failed to retrieve wishlist", 500));
  }
};
//  Remove product from wishlist
const removeFromWishlist = async (req, res, next) => {
  try {
    const { id: productId } = req.params;
    const userId = req.user.id;

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return next(new AppError("Wishlist not found", 404));
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );
    await wishlist.save();

    res.status(201).json({
      success: true,
      isAuthenticated: true,
      message: "Product removed from wishlist",
      wishlist,
      isInWishlist: false,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const getWishlistById = async (req, res, next) => {
  const { id } = req.params;

  const userId = req.user.id;
  try {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (wishlist) {
      const isInWishlist = wishlist.products.includes(id);

      return res.status(201).json({
        success: true,
        isAuthenticated: true,
        isInWishlist,
      });
    } else {
      return next(new AppError("No wishlist found for this user", 404));
    }
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

module.exports = {
  addWishlist,
  getWishlist,
  removeFromWishlist,
  getWishlistById,
};
