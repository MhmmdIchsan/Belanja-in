const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("./models/Category");

dotenv.config();

const categories = [
  { name: "Fashion", icon: "FiShoppingBag", description: "Pakaian dan aksesoris" },
  { name: "Elektronik", icon: "FiMonitor", description: "Barang elektronik dan gadget" },
  { name: "Sepatu", icon: "FiZap", description: "Beragam sepatu" },
  { name: "Tas", icon: "FiBriefcase", description: "Tas untuk berbagai keperluan" },
  { name: "Jam Tangan", icon: "FiClock", description: "Jam tangan pria dan wanita" },
  { name: "Kesehatan", icon: "FiHeart", description: "Produk kesehatan dan kebugaran" },
  { name: "Olahraga", icon: "FiActivity", description: "Peralatan dan pakaian olahraga" },
  { name: "Rumah Tangga", icon: "FiHome", description: "Barang-barang rumah tangga" },
  { name: "Fotografi", icon: "FiCamera", description: "Kamera dan aksesoris" },
  { name: "Peralatan", icon: "FiTool", description: "Peralatan dan perlengkapan" },
  { name: "Musik", icon: "FiMusic", description: "Alat musik dan perlengkapannya" },
  { name: "Hadiah", icon: "FiGift", description: "Kado dan hadiah spesial" },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Category.deleteMany(); // clear existing
    await Category.insertMany(categories);
    console.log("✅ Kategori berhasil di-seed!");
    process.exit();
  } catch (error) {
    console.error("❌ Error saat seeding kategori:", error);
    process.exit(1);
  }
};

seedCategories();
