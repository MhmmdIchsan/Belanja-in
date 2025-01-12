const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    if (!cart) return res.json({ user: req.user.id, items: [] });

    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal mengambil keranjang", error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, variation, quantity = 1 } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Produk tidak ditemukan" });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = new Cart({ user: req.user.id, items: [] });

    // Cek apakah variasi tersebut sudah ada di keranjang
    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variation.color === variation.color &&
        item.variation.size === variation.size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, variation, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal menambahkan ke keranjang", error: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart)
      return res.status(404).json({ message: "Keranjang tidak ditemukan" });

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item)
      return res
        .status(404)
        .json({ message: "Produk tidak ditemukan di keranjang" });

    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal memperbarui keranjang", error: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart)
      return res.status(404).json({ message: "Keranjang tidak ditemukan" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );
    await cart.save();

    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Gagal menghapus item dari keranjang",
        error: err.message,
      });
  }
};
