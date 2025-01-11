const Product = require("../models/Product");
const Category = require("../models/Category");

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name");
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create Product
exports.createProduct = async (req, res) => {
  const { name, description, price, image, category, variations } = req.body;

  if (!name || !description || !price || !image || !category || !variations) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category,
      variations, // Menyimpan variasi produk
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  const { name, description, price, image, category, variations } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.image = image || product.image;
    product.category = category || product.category;
    product.variations = variations || product.variations; // Mengupdate variasi produk

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add Review to Product
exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating harus antara 1 dan 5" });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });

    const newReview = {
      user: req.user.id,
      rating,
      comment,
    };

    product.reviews.push(newReview);

    // Hitung ulang average rating
    const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.averageRating = totalRating / product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review ditambahkan", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
