const Order = require("../models/Order");
const Cart = require("../models/Cart");
const mongoose = require("mongoose");

// Fungsi untuk membuat pesanan
const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    const user = req.user;

    // Ambil data cart dari user
    const cart = await Cart.findOne({ user }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Keranjang kosong." });
    }

    const totalAmount = cart.items.reduce(
      (total, item) => total + item.variation.price * item.quantity,
      0
    );

    // Buat pesanan baru
    const newOrder = new Order({
      user,
      items: cart.items.map((item) => ({
        product: item.product._id,
        variation: item.variation,
        quantity: item.quantity,
        total: item.variation.price * item.quantity,
      })),
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || "cod", // default fallback
    });

    await newOrder.save();

    // Kosongkan keranjang setelah checkout
    await Cart.updateOne({ user }, { $set: { items: [] } });

    res.status(201).json({ message: "Pesanan berhasil dibuat", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal membuat pesanan" });
  }
};


// Fungsi untuk mendapatkan daftar pesanan pengguna
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user }).populate("items.product");
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil pesanan" });
  }
};

// Fungsi untuk mendapatkan detail pesanan
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");
    if (!order) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });
    }
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil detail pesanan" });
  }
};

// Fungsi untuk mengubah status pesanan
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Status pesanan berhasil diperbarui", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal memperbarui status pesanan" });
  }
};

const updateOrderStatusToPaid = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });
    }

    // Update status menjadi "paid"
    order.status = "paid";
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.error("Gagal memperbarui status pesanan:", error);
    res.status(500).json({ message: "Gagal memperbarui status pesanan" });
  }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus, updateOrderStatusToPaid };
