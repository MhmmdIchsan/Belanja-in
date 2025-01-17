const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/adminController");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

// User Routes
router.get("/users", isAuthenticated, isAdmin, getAllUsers);

// Product Routes
router.get("/products", isAuthenticated, isAdmin, getAllProducts);
router.post("/products", isAuthenticated, isAdmin, createProduct);
router.put("/products/:id", isAuthenticated, isAdmin, updateProduct);
router.delete("/products/:id", isAuthenticated, isAdmin, deleteProduct);

// Order Routes
router.get("/orders", isAuthenticated, isAdmin, getAllOrders);
router.put("/orders/:id/status", isAuthenticated, isAdmin, updateOrderStatus);

module.exports = router;
