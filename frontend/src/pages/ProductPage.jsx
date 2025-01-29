import React from "react";
import Navbar from "../components/Common/Navbar";
import Header from "../components/Home/Header";
import ProductDetails from "../components/Product/ProductDetails";

const ProductPage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <ProductDetails/>
    </>
  );
};

export default ProductPage;
