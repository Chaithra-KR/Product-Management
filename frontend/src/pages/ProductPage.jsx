import React from "react";
import Navbar from "../components/Common/Navbar";
import ProductDetails from "../components/Product/ProductDetails";
import Header from "../components/Product/Header";

const ProductPage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <div className="max-w-screen-2xl mx-auto bg-white">
        <ProductDetails />
      </div>
    </>
  );
};

export default ProductPage;
