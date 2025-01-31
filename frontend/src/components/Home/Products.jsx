import React, { useEffect, useState } from "react";
import Icons from "../../../utils/Icons";
import {
  addWishlist,
  checkIfInWishlist,
  deleteFromWishlist,
  getFilteredProductsBySubcategory,
  getProducts,
} from "../../../utils/axiosService";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../../utils/cryptUrl";
import { message } from "antd";
import { useAuth } from "../../../utils/AuthContext";

const Products = ({ searchTerm, selectedSubcategories }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [pagination, setPagination] = useState({
    totalItems: 0,
    currentPage: 1,
    totalPages: 1,
    limit: 3,
  });
  const navigate = useNavigate();
  const { fetchWishlist } = useAuth();

  // Fetch products and wishlist status
  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      let response;
      if (selectedSubcategories.length > 0) {
        response = await getFilteredProductsBySubcategory(
          selectedSubcategories,
          page,
          pagination.limit
        );
      } else {
        response = await getProducts(searchTerm, page, pagination.limit);
      }

      if (response.success && response.data.length > 0) {
        setProducts(response.data);
        setPagination(response.pagination);

        // Fetch wishlist status for each product
        const wishlistStatuses = {};
        for (const product of response.data) {
          const wishlistResponse = await checkIfInWishlist(product._id);
          wishlistStatuses[product._id] = wishlistResponse.isInWishlist;
        }
        setWishlistStatus(wishlistStatuses);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedSubcategories]);

  // Toggle Wishlist Function
  const toggleWishlist = async (productId) => {
    try {
      const isCurrentlyInWishlist = wishlistStatus[productId];
      let response;

      if (isCurrentlyInWishlist) {
        response = await deleteFromWishlist(productId);
        if (response.success) {
          setWishlistStatus((prev) => ({
            ...prev,
            [productId]: false,
          }));
          message.success("Removed from wishlist!");

          // Fetch updated wishlist after removal
          await fetchWishlist();
        } else {
          throw new Error(
            response.message || "Failed to remove from wishlist."
          );
        }
      } else {
        response = await addWishlist({ productId });
        if (response.success) {
          setWishlistStatus((prev) => ({
            ...prev,
            [productId]: true,
          }));
          message.success("Added to wishlist!");

          // Fetch updated wishlist after addition
          await fetchWishlist();
        } else {
          throw new Error(response.message || "Failed to add to wishlist.");
        }
      }
    } catch (error) {
      message.error(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex-1">
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-600 py-10">
          No products found for "
          <span className="font-semibold">{searchTerm}</span>"
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl border-2 border-gray-200 shadow p-4 relative"
            >
              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product._id)}
                className="absolute top-5 right-6 p-1.5 bg-blue-100 text-blue-900 rounded-full hover:bg-blue-200 transition-colors"
              >
                {wishlistStatus[product._id] ? (
                  <Icons path="heart-filled" className="w-5 h-5 text-red-500" />
                ) : (
                  <Icons path="heart" className="w-5 h-5 text-blue-900" />
                )}
              </button>

              {/* Product Image */}
              <div className="mb-4">
                <img
                  src={`${baseUrl}/uploads/${product.images[0]}`}
                  alt={product.title}
                  className="w-full h-64 object-cover rounded-2xl cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                />
              </div>

              {/* Product Title */}
              <h3
                onClick={() => navigate(`/product/${product._id}`)}
                className="text-lg font-medium text-blue-900 mb-2 cursor-pointer"
              >
                {product.title}
              </h3>

              {/* Product Price */}
              <p className="text-gray-900 font-semibold">
                ${product.variants[0].price}
              </p>

              {/* Star Ratings (Placeholder) */}
              <div className="flex mt-2">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
