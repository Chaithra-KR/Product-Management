import React, { useEffect, useState } from "react";
import Icons from "../../../utils/Icons";
import { getProducts } from "../../../utils/axiosService";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../../utils/cryptUrl";

const Products = ({ searchTerm }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    currentPage: 1,
    totalPages: 1,
    limit: 3,
  });
  const navigate = useNavigate();

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await getProducts(searchTerm, page, pagination.limit);
      if (response.success && response.data.length > 0) {
        setProducts(response.data);
        setPagination(response.pagination);
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
  }, [searchTerm]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchProducts(page);
    }
  };

  const pageButtons = () => {
    const totalPages = pagination.totalPages;
    const currentPage = pagination.currentPage;
    const maxVisiblePages = 5;
    let pageNumbers = [];

    if (totalPages <= maxVisiblePages) {
      //if pages count equal or less than maxVisiblePages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      // Show pages near the current page
      const start = Math.max(currentPage - 1, 2); // Start page (at least 2)
      const end = Math.min(currentPage + 1, totalPages - 1); // End page (at most totalPages-1)

      // Add pages around the current page
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      // "..." before the last page
      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      }

      // show the last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
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
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border-2 border-gray-200 shadow p-4 relative"
            >
              <button className="absolute top-5 right-6 p-1.5 bg-blue-100 text-blue-900 rounded-full hover:bg-blue-200 transition-colors">
                <Icons path="heart" className="w-5 h-5 text-blue-900" />
              </button>
              <div className="mb-4">
                <img
                  src={`${baseUrl}/uploads/${product.images[0]}`}
                  alt={product.title}
                  className="w-full h-64 object-cover rounded-2xl cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                />
              </div>
              <h3
                onClick={() => navigate(`/product/${product._id}`)}
                className="text-lg font-medium text-blue-900 mb-2 cursor-pointer"
              >
                {product.title}
              </h3>
              <p className="text-gray-900 font-semibold">
                ${product.variants[0].price}
              </p>
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

      {/* Pagination */}
      {!products.length === 0 && (
        <div className="mt-8 h-20 flex items-center justify-between">
          <p className="text-sm text-gray-600">{pagination.totalItems} items</p>
          {pagination.totalPages > 1 && (
            <div className="flex items-center space-x-2">
              {pageButtons().map((item, index) =>
                item === "..." ? (
                  <span key={index} className="text-gray-600">
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 hover:text-gray-800 ${
                      pagination.currentPage === item
                        ? "bg-yellow-500 text-white"
                        : ""
                    }`}
                    onClick={() => handlePageChange(item)}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          )}

          <div>
            <span>show</span>
            <select
              className="ml-4 px-2 py-1 border rounded-lg"
              onChange={(e) => {
                const newLimit = parseInt(e.target.value) * 3;
                setPagination({
                  ...pagination,
                  limit: newLimit,
                });
                fetchProducts(1);
              }}
            >
              <option value={10}>10 rows</option>
              <option value={20}>20 rows</option>
              <option value={50}>50 rows</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
