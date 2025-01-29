import React, { useState } from "react";
import Icons from "../../../utils/Icons";
import { LoginBg } from "../../assets/image";

const ProductDetails = () => {
  const [selectedRam, setSelectedRam] = useState("4 GB");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);

  const product = {
    name: "HP AMD Ryzen 3",
    price: 529.99,
    stock: 34,
    images: [LoginBg, LoginBg, LoginBg],
    ramOptions: ["4 GB", "8 GB", "16 GB"],
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      {/* Left side - Images */}
      <div className="w-full md:w-1/2">
        <div className="bg-white h-[31rem] rounded-2xl border-2 border-gray-200 p-4 mb-4">
          <img
            src={product.images[mainImage]}
            alt="Product"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {product.images.slice(1).map((img, idx) => (
            <button
              key={idx}
              className=" rounded-2xl p-2 border-2 border-gray-200 hover:border-primary"
              onClick={() => setMainImage(idx + 1)}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-24 object-contain rounded-2xl bg-gray-100"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Right side - Details */}
      <div className="w-full md:w-1/2 p-2">
        <h1 className="text-3xl font-bold text-primary">{product.name}</h1>

        <div className="mt-4">
          <span className="text-3xl font-bold text-gray-700">
            ${product.price}
          </span>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2 text-xl">
            <span className="font-medium ">Availability:</span>
            <div className="flex items-center gap-1 text-green-600">
              <Icons path="check" className="w-4 h-4" />
              <span>In stock</span>
            </div>
          </div>
          <p className="text-lg text-gray-500 mt-1">
            Hurry up! only {product.stock} product left in stock!
          </p>
        </div>
        <div className="my-10 border-2 border-gray-200"></div>
        <div className="flex items-center gap-5">
          <span className="font-medium">Ram:</span>
          <div className="flex gap-4 mt-2">
            {product.ramOptions.map((ram) => (
              <button
                key={ram}
                className={`px-3 py-1 rounded text-gray-800 bg-gray-100 ${
                  selectedRam === ram ? "border border-gray-900 " : ""
                }`}
                onClick={() => setSelectedRam(ram)}
              >
                {ram}
              </button>
            ))}
          </div>
        </div>

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

        <div className="flex gap-4 mt-8 font-semibold text-lg">
          <button className="w-44 py-3 bg-yellow-500 text-white rounded-3xl hover:bg-yellow-600">
            Edit product
          </button>
          <button className="w-44 py-3 bg-yellow-500 text-white rounded-3xl hover:bg-yellow-600">
            Buy it now
          </button>
          <button className="w-12 h-12 border rounded-full flex items-center justify-center bg-gray-100">
            <Icons path="heart" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
