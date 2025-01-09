const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product'); // Sesuaikan dengan lokasi model Product kamu

dotenv.config();

const products = [
  {
    name: 'Sneakers',
    description: 'Sepatu sneakers nyaman dan stylish.',
    price: 499000,
    rating: 4.5,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1618354691249-fb8c8ac2d1c3?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Smartwatch',
    description: 'Jam tangan pintar dengan berbagai fitur kesehatan.',
    price: 1299000,
    rating: 4.7,
    category: 'Elektronik',
    image: 'https://images.unsplash.com/photo-1579669246006-ebec7560ff3b?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Blender',
    description: 'Blender serbaguna untuk kebutuhan dapur.',
    price: 299000,
    rating: 4.2,
    category: 'Rumah Tangga',
    image: 'https://images.unsplash.com/photo-1604908177220-3de1528e8f7a?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Buku “Belajar React”',
    description: 'Panduan lengkap belajar React untuk pemula.',
    price: 99000,
    rating: 5.0,
    category: 'Buku',
    image: 'https://images.unsplash.com/photo-1588776814546-6d840be3df64?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Set Meja Belajar',
    description: 'Meja belajar minimalis dengan rak penyimpanan.',
    price: 759000,
    rating: 4.3,
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1622202171943-9c794a86e9a6?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Headphone Bluetooth',
    description: 'Headphone nirkabel dengan kualitas suara premium.',
    price: 399000,
    rating: 4.6,
    category: 'Aksesoris',
    image: 'https://images.unsplash.com/photo-1580894908360-1f94d9b1df5c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Tas Ransel',
    description: 'Tas ransel multifungsi untuk aktivitas sehari-hari.',
    price: 299000,
    rating: 4.4,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1598032894001-0a5b0a1b8b3f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Kamera DSLR',
    description: 'Kamera DSLR dengan kualitas gambar profesional.',
    price: 5499000,
    rating: 4.8,
    category: 'Elektronik',
    image: 'https://images.unsplash.com/photo-1519183071298-a2962be54afa?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Vacuum Cleaner',
    description: 'Vacuum cleaner portabel untuk membersihkan rumah.',
    price: 899000,
    rating: 4.5,
    category: 'Rumah Tangga',
    image: 'https://images.unsplash.com/photo-1583224473442-1e9a6f3c8d6b?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Novel “Petualangan Dunia”',
    description: 'Novel seru yang membawa Anda ke dunia petualangan.',
    price: 129000,
    rating: 4.9,
    category: 'Buku',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

const seedProducts = async () => {
  try {
    // Hapus data lama sebelum menambah produk baru
    await Product.deleteMany();
    console.log('🗑️ All existing products removed');

    // Tambahkan produk baru
    await Product.insertMany(products);
    console.log('✅ Seeder executed successfully, products added');
    process.exit();
  } catch (err) {
    console.error('❌ Error during seeding:', err);
    process.exit(1);
  }
};

// Jalankan seeder
connectDB().then(() => {
  seedProducts();
});
