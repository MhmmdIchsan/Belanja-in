import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import NoResultsComponent from "./NoResultsComponent";

const ProductSection = ({ categories }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Jumlah produk yang ditampilkan per halaman

  // Fetch products from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Filter produk berdasarkan kategori dan pencarian
  const filteredProducts = products
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Sorting produk
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === "priceAsc") return a.price - b.price;
    if (sortOption === "priceDesc") return b.price - a.price;
    if (sortOption === "ratingDesc") return b.rating - a.rating;
    if (sortOption === "ratingAsc") return a.rating - b.rating;
    return 0;
  });

  // Pagination
  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  
  // Menentukan produk yang akan ditampilkan berdasarkan halaman saat ini
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Fungsi untuk mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-10">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-md mb-6 border border-gray-200">
        {/* Kategori */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Kategori:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white border text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search Bar (Glassmorphism Style) */}
        <div className="flex-1 max-w-xs w-full">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-black/5 backdrop-blur-md border border-white/20 placeholder-gray-600 text-gray-800 shadow-inner shadow-white/5 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
          />
        </div>

        {/* Sorting */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Urutkan:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white border text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih</option>
            <option value="priceAsc">Harga Termurah</option>
            <option value="priceDesc">Harga Termahal</option>
            <option value="ratingDesc">Rating Terbaik</option>
            <option value="ratingAsc">Rating Terburuk</option>
          </select>
        </div>
      </div>

      {/* Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-full">
            <NoResultsComponent />
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              &lt; Prev
            </button>
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => paginate(num + 1)}
                className={`px-4 py-2 ${currentPage === num + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"} rounded-md hover:bg-blue-500`}
              >
                {num + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Next &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSection;
