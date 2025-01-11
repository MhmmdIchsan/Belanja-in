const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const Category = require("./models/Category");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ DB Connection Failed:", err);
    process.exit(1);
  }
};

const seedProducts = async () => {
  try {
    await connectDB();

    const categories = await Category.find();
    if (categories.length === 0) {
      throw new Error("Tidak ada kategori ditemukan. Jalankan categorySeeder dulu.");
    }

    await Product.deleteMany();

    const sampleProducts = [
        {
          name: "Kemeja Polos Pria",
          description: "Kemeja lengan panjang bahan katun, nyaman untuk aktivitas sehari-hari.",
          price: 120000,
          image: "https://source.unsplash.com/featured/?shirt",
          category: categories.find((c) => c.name === "Fashion")._id,
          averageRating: 4.5,
          reviews: [],
          variations: [
            { color: "Hitam", size: "M", stock: 10, price: 120000 },
            { color: "Putih", size: "L", stock: 5, price: 125000 },
          ],
        },
        {
          name: "Smartphone Android 6.5 inci",
          description: "Smartphone canggih dengan kamera 50MP dan baterai 5000mAh.",
          price: 2500000,
          image: "https://source.unsplash.com/featured/?smartphone",
          category: categories.find((c) => c.name === "Elektronik")._id,
          averageRating: 4.7,
          reviews: [],
          variations: [
            { color: "Hitam", size: "128GB", stock: 15, price: 2500000 },
            { color: "Biru", size: "256GB", stock: 10, price: 2650000 },
          ],
        },
        {
          name: "Sepatu Lari Ringan",
          description: "Sepatu olahraga ringan, cocok untuk jogging dan gym.",
          price: 350000,
          image: "https://source.unsplash.com/featured/?shoes",
          category: categories.find((c) => c.name === "Sepatu")._id,
          averageRating: 4.2,
          reviews: [],
          variations: [
            { color: "Hitam", size: "42", stock: 12, price: 350000 },
            { color: "Putih", size: "43", stock: 6, price: 360000 },
          ],
        },
        {
          name: "Tas Kulit Wanita",
          description: "Tas selempang dari kulit sintetis premium.",
          price: 225000,
          image: "https://source.unsplash.com/featured/?bag",
          category: categories.find((c) => c.name === "Tas")._id,
          averageRating: 4.6,
          reviews: [],
          variations: [
            { color: "Cokelat", size: "S", stock: 8, price: 225000 },
            { color: "Hitam", size: "M", stock: 5, price: 230000 },
          ],
        },
        {
          name: "Jam Tangan Digital",
          description: "Jam tangan digital tahan air dengan fitur stopwatch dan alarm.",
          price: 180000,
          image: "https://source.unsplash.com/featured/?watch",
          category: categories.find((c) => c.name === "Jam Tangan")._id,
          averageRating: 4.4,
          reviews: [],
          variations: [
            { color: "Silver", size: "One Size", stock: 20, price: 180000 },
            { color: "Hitam", size: "One Size", stock: 15, price: 185000 },
          ],
        },
        {
          name: "Masker Wajah Herbal",
          description: "Masker wajah alami untuk kulit sehat dan cerah.",
          price: 35000,
          image: "https://source.unsplash.com/featured/?mask",
          category: categories.find((c) => c.name === "Kesehatan")._id,
          averageRating: 4.3,
          reviews: [],
          variations: [
            { color: "Hijau", size: "100ml", stock: 25, price: 35000 },
            { color: "Putih", size: "150ml", stock: 18, price: 37000 },
          ],
        },
        {
          name: "Matras Yoga Anti Slip",
          description: "Matras yoga ringan dan tidak licin untuk latihan harian.",
          price: 90000,
          image: "https://source.unsplash.com/featured/?yoga",
          category: categories.find((c) => c.name === "Olahraga")._id,
          averageRating: 4.8,
          reviews: [],
          variations: [
            { color: "Ungu", size: "180cm", stock: 12, price: 90000 },
            { color: "Hijau", size: "200cm", stock: 10, price: 95000 },
          ],
        },
        {
          name: "Vacuum Cleaner Mini",
          description: "Penyedot debu praktis untuk rumah kecil dan mobil.",
          price: 290000,
          image: "https://source.unsplash.com/featured/?vacuum",
          category: categories.find((c) => c.name === "Rumah Tangga")._id,
          averageRating: 4.5,
          reviews: [],
          variations: [
            { color: "Merah", size: "Mini", stock: 8, price: 290000 },
            { color: "Putih", size: "Standard", stock: 6, price: 295000 },
          ],
        },
        {
          name: "Kamera Mirrorless 24MP",
          description: "Kamera ringan dan jernih, cocok untuk pemula.",
          price: 3500000,
          image: "https://source.unsplash.com/featured/?camera",
          category: categories.find((c) => c.name === "Fotografi")._id,
          averageRating: 4.9,
          reviews: [],
          variations: [
            { color: "Hitam", size: "Body Only", stock: 5, price: 3500000 },
            { color: "Perak", size: "Dengan Lensa", stock: 3, price: 3700000 },
          ],
        },
        {
          name: "Gitar Akustik Kayu",
          description: "Gitar dengan suara jernih dan body kokoh.",
          price: 750000,
          image: "https://source.unsplash.com/featured/?guitar",
          category: categories.find((c) => c.name === "Musik")._id,
          averageRating: 4.6,
          reviews: [],
          variations: [
            { color: "Natural", size: "Standard", stock: 10, price: 750000 },
            { color: "Cokelat", size: "Jumbo", stock: 6, price: 780000 },
          ],
        },
      ];
      

    await Product.insertMany(sampleProducts);
    console.log("✅ Produk berhasil di-seed!");
    process.exit();
  } catch (err) {
    console.error("❌ Gagal seeding produk:", err);
    process.exit(1);
  }
};

seedProducts();
