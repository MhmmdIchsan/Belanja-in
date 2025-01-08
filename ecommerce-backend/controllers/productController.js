const Product = require('../models/Product')

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Create / Post Product
exports.createProduct = async (req, res) => {
  const { name, description, price, category, image, rating } = req.body

  try {
    // Validasi sederhana
    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ message: 'Semua field wajib diisi' })
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
      rating: rating || 0,
    })

    const savedProduct = await newProduct.save()
    res.status(201).json(savedProduct)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}