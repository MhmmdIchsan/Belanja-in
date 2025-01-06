import React from "react";
import { useParams, Link } from "react-router-dom"; // Menggunakan Link untuk navigasi
import { useCart } from "../context/CartContext"; // Jika menggunakan context untuk keranjang
import products from "../data/products"; // Data produk yang disediakan

const ProductDetailPage = () => {
  const { id } = useParams(); // Mengambil ID produk dari URL
  const { addToCart } = useCart(); // Fungsi untuk menambah produk ke keranjang
  const product = products.find((p) => p.id === parseInt(id)); // Menemukan produk berdasarkan ID

  // Jika produk tidak ditemukan, tampilkan pesan error
  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-center text-red-500">Produk tidak ditemukan!</p>
      </div>
    );
  }

  // Fungsi untuk format harga ke Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Gambar Produk */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full h-auto rounded-lg shadow-md transform transition duration-500 hover:scale-105"
          />
        </div>

        {/* Detail Produk */}
        <div className="flex flex-col justify-between">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h2>
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

      {/* Produk Lain */}
      <div className="mt-16">
        <h3 className="text-3xl font-bold text-gray-900 mb-6">Produk Lainnya</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products
            .filter((p) => p.id !== product.id) // Menyaring produk yang sudah ditampilkan
            .slice(0, 4) // Menampilkan 4 produk lainnya
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
                    <h4 className="text-xl font-semibold text-gray-900">{p.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{p.description}</p>
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
