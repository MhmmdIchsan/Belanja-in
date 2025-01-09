import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAdd }) => {
  // Format harga ke format Rupiah
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
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {product.name}
          </h2>
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        </div>
        <div className="mt-auto">
          <p className="text-lg font-bold text-gray-900 mb-4">
            {formatRupiah(product.price)}
          </p>
          <div className="flex gap-4">
            {/* Update the Link to go to the product detail page based on the product's ID */}
            <Link
              to={`/product/${product._id}`} // Navigate to /product/:id, where :id is the product's unique _id
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Lihat
            </Link>
            <button
              onClick={() => onAdd(product)}
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
