const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  updateOrderStatusToPaid,
  getMyOrders
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// Middleware untuk memastikan user sudah login
router.use(protect);

// Membuat pesanan
router.post("/", protect, createOrder);

// Mengambil daftar pesanan pengguna
router.get("/", protect, getOrders);

// Mengambil detail pesanan berdasarkan ID
router.get("/:id", protect, getOrderById);

// Mengubah status pesanan
router.put("/:id/status", protect, updateOrderStatus);

// Mengupdate status pesanan menjadi "paid"
router.put("/:id/pay", protect, updateOrderStatusToPaid);

// Ambil pesanan milik user login
router.get("/myorders", protect, getMyOrders);

module.exports = router;
