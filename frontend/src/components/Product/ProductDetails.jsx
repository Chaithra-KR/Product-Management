import React, { useEffect, useState } from "react";
import Icons from "../../../utils/Icons";
import { LoginBg } from "../../assets/image";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import {
  addWishlist,
  checkIfInWishlist,
  deleteFromWishlist,
  getProductById,
} from "../../../utils/axiosService";
import baseUrl from "../../../utils/cryptUrl";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const { id } = useParams();
  const [isInWishlist, setIsInWishlist] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        if (response.success) {
          setProduct(response.data);
          setSelectedVariant(response.data.variants[0]);

          // Check if the product is in the wishlist
          const wishlistResponse = await checkIfInWishlist(id);
          console.log(wishlistResponse);

          if (wishlistResponse.success) {
            setIsInWishlist(wishlistResponse.isInWishlist); // Set the status
          }
        } else {
          message.error("Failed to load product details.");
        }
      } catch (error) {
        message.error("Error fetching product details.");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const toggleWishlist = async (productId) => {
    try {
      let response;
  
      if (isInWishlist) {
        response = await deleteFromWishlist(productId);
        if (response.success) {
          setIsInWishlist((prev) => !prev); 
          message.success("Removed from wishlist!");
        } else {
          throw new Error(response.message || "Failed to remove from wishlist.");
        }
      } else {
        response = await addWishlist({ productId });
        if (response.success) {
          setIsInWishlist((prev) => !prev); 
          message.success("Added to wishlist!");
        } else {
          throw new Error(response.message || "Failed to add to wishlist.");
        }
      }
    } catch (error) {
      message.error(error.message || "An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left side - Images */}
      <div className="w-full md:w-1/2">
        <div className="bg-white h-[29rem] rounded-2xl border-2 border-gray-200 p-4 mb-4">
          <img
            src={
              product.images && product.images.length > 0
                ? `${baseUrl}/uploads/${product.images[mainImage]}`
                : LoginBg
            }
            alt={product.title}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="flex w-full gap-2">
          {product.images &&
            product.images.length > 1 &&
            product.images.map((img, idx) => (
              <button
                key={idx}
                className={`rounded-2xl p-2 border-2 ${
                  mainImage === idx ? "border-primary" : "border-gray-200"
                } w-${Math.floor(100 / product.images.length)}`}
                onClick={() => setMainImage(idx)}
                style={{ width: `${100 / product.images.length}%` }}
              >
                <img
                  src={`${baseUrl}/uploads/${img}`}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-24 object-contain rounded-2xl bg-gray-100"
                />
              </button>
            ))}
        </div>
      </div>

      {/* Right side - Details */}
      <div className="w-full md:w-1/2 p-2">
        <h1 className="text-3xl font-bold text-primary">{product.title}</h1>

        {/* Price */}
        <div className="mt-4">
          <span className="text-3xl font-bold text-gray-700">
            ${selectedVariant?.price || "N/A"}
          </span>
        </div>

        {/* Availability */}
        <div className="mt-4">
          <div className="flex items-center gap-2 text-xl">
            <span className="font-medium">Availability:</span>
            <div className="flex items-center gap-1 text-green-600">
              <Icons path="check" className="w-4 h-4" />
              <span>
                {selectedVariant?.qty > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
          <p className="text-lg text-gray-500 mt-1">
            Hurry up! Only {selectedVariant?.qty || 0} left in stock!
          </p>
        </div>

        <div className="my-10 border-2 border-gray-200"></div>

        {/* Variant Selection */}
        <div className="flex items-center gap-5">
          <span className="font-medium">Variants:</span>
          <div className="flex gap-4 mt-2">
            {product.variants.map((variant) => (
              <button
                key={variant._id}
                className={`px-3 py-1 rounded text-gray-800 bg-gray-100 ${
                  selectedVariant?._id === variant._id
                    ? "border border-gray-900"
                    : ""
                }`}
                onClick={() => setSelectedVariant(variant)}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selection */}
        <div className="mt-6">
          <span className="font-medium">Quantity:</span>
          <div className="flex items-center gap-2 mt-2">
            <button
              className="w-8 h-8 border rounded-md flex items-center justify-center"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              <Icons path="minus" className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={quantity}
              className="w-16 text-center border rounded-md py-1"
              readOnly
            />
            <button
              className="w-8 h-8 border rounded-md flex items-center justify-center"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Icons path="plus" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8 font-semibold text-lg">
          <button className="w-44 py-3 bg-yellow-500 text-white rounded-3xl hover:bg-yellow-600">
            Edit product
          </button>
          <button className="w-44 py-3 bg-yellow-500 text-white rounded-3xl hover:bg-yellow-600">
            Buy it now
          </button>

          <button
            onClick={() => toggleWishlist(product._id)}
            className="w-12 h-12 border rounded-full flex items-center justify-center bg-gray-100"
          >
            {isInWishlist ? (
              <Icons
                path="heart-filled"
                className={`w-5 h-5  text-red-500
                }`} // Visible when in wishlist
              />
            ) : (
              <Icons
                path="heart"
                className={`w-5 h-5 text-gray-600
                }`} // Visible when not in wishlist
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
