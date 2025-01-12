import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        setSelectedVariation(res.data.variations?.[0] || null);
        setLoading(false);
      } catch (err) {
        setError("Produk tidak ditemukan!");
        setLoading(false);
      }
    };

    const fetchRelated = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setRelatedProducts(res.data);
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    };

    fetchProduct();
    fetchRelated();
  }, [id]);

  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Produk tidak ditemukan!</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex justify-center">
          <img
            src={selectedVariation?.image || product.image}
            alt={product.name}
            className="max-w-full h-auto rounded-lg shadow-md transform transition duration-500 hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-between">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h2>
          <p className="text-lg text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg text-gray-600 mb-4">
            Kategori: <span className="font-semibold">{product.category?.name}</span>
          </p>

          {product.variations?.length > 0 && (
            <div className="mb-4">
              <label className="block font-semibold mb-2">Pilih Variasi:</label>
              <select
                onChange={(e) =>
                  setSelectedVariation(
                    product.variations.find(
                      (v, idx) => idx === Number(e.target.value)
                    )
                  )
                }
                className="w-full p-2 border rounded-lg"
              >
                {product.variations.map((v, index) => (
                  <option key={index} value={index}>
                    {v.color} - {v.size} ({formatRupiah(v.price)})
                    {v.stock <= 0 && " - Habis"}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-4">
            <label className="block font-semibold mb-2">Jumlah:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              min={1}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <p className="text-2xl font-semibold text-gray-900 mb-6">
            {formatRupiah(selectedVariation?.price || product.price)}
          </p>

          <button
            onClick={async () => {
              try {
                await addToCart(product._id, selectedVariation, quantity);
                alert("Produk berhasil ditambahkan ke keranjang!");
              } catch (err) {
                alert("Gagal menambahkan ke keranjang.");
              }
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 transform hover:scale-105"
            disabled={selectedVariation?.stock === 0}
          >
            {selectedVariation?.stock === 0 ? "Stok Habis" : "Tambah ke Keranjang"}
          </button>
        </div>
      </div>

      {product.reviews?.length > 0 ? (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ulasan Pengguna
          </h3>
          <div className="space-y-6">
            {product.reviews.map((review, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800">
                    {review.user?.name || "Pengguna Anonim"}
                  </span>
                  <span className="text-yellow-500 font-bold">
                    {"★".repeat(review.rating)} <span className="text-gray-500">({review.rating}/5)</span>
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(review.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ulasan Pengguna
          </h3>
          <p className="text-gray-600">Belum ada ulasan untuk produk ini.</p>
        </div>
      )}

      <div className="mt-16">
        <h3 className="text-3xl font-bold text-gray-900 mb-6">
          Produk Lainnya
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts
            .filter((p) => p._id !== product._id)
            .slice(0, 4)
            .map((p) => (
              <Link
                to={`/product/${p._id}`}
                key={p._id}
                className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h4 className="text-xl font-semibold text-gray-900">
                    {p.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">{p.description}</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatRupiah(p.price || p.variations?.[0]?.price || 0)}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;