const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const productVariationSchema = new mongoose.Schema(
  {
    color: { type: String, required: true }, // Warna produk
    size: { type: String, required: true }, // Ukuran produk (misalnya: S, M, L, XL)
    stock: { type: Number, required: true, min: 0 }, // Stok untuk variasi tertentu
    price: { type: Number, required: true }, // Harga per variasi
    image: { type: String }, // Gambar yang mewakili variasi ini, bisa berbeda dari produk utama
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // Gambar produk utama
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    reviews: [reviewSchema],
    averageRating: { type: Number, default: 0 }, // dihitung dari reviews

    // Menambahkan variasi produk
    variations: [productVariationSchema], // Array untuk variasi produk seperti warna, ukuran, dll
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
