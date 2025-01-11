import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import useCart dari context

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // Mengambil fungsi addToCart dari context

  // Format harga ke Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {product.name}
          </h2>
        </div>
        <div className="mt-auto">
          <p className="text-lg font-bold text-gray-900 mb-4">
            {formatRupiah(product.price || product.variations?.[0]?.price || 0)}
          </p>
          <div className="flex gap-4">
            <Link
              to={`/product/${product._id}`}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200 text-center"
            >
              Lihat
            </Link>
            <button
              onClick={() => addToCart(product)} // Menambahkan produk ke keranjang
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Tambah
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
