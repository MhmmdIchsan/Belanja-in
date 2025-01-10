import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios"; // Import axios for HTTP requests
import { useCart } from "../context/CartContext"; // If you are using context for cart

const ProductDetailPage = () => {
  const { id } = useParams(); // Get product ID from URL params
  const { addToCart } = useCart(); // Cart functionality if you are using a context
  const [product, setProduct] = useState(null); // State to hold product data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [relatedProducts, setRelatedProducts] = useState([]); // State to hold related products

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product details by ID
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(response.data); // Set product data to state//
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        ////
        setError("Produk tidak ditemukan!"); // Error if fetching fails
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        console.log("Fetched Related Products:", response.data); // Check if data is being fetched
        setRelatedProducts(response.data); // Set data to state
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    };

    fetchProduct();
    fetchRelatedProducts();
  }, [id]); // Dependency array includes `id` so effect runs when `id` changes

  // If data is loading
  if (loading) {
    return <p>Loading...</p>;
  }

  // If there is an error
  if (error) {
    return <p>{error}</p>;
  }

  // If product is not found
  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-center text-red-500">Produk tidak ditemukan!</p>
      </div>
    );
  }

  // Function to format price to Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full h-auto rounded-lg shadow-md transform transition duration-500 hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h2>
          <p className="text-lg text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-gray-900 mb-6">
            {formatRupiah(product.price)}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 transform hover:scale-105"
          >
            Tambah ke Keranjang
          </button>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-3xl font-bold text-gray-900 mb-6">
          Produk Lainnya
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts
            .filter((p) => p.id !== product.id) // Exclude the current product
            .slice(0, 4) // Limit to 4 products
            .map((p) => (
              <div
                key={p.id}
                className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <Link to={`/product/${p.id}`}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h4 className="text-xl font-semibold text-gray-900">
                      {p.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {p.description}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatRupiah(p.price)}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
