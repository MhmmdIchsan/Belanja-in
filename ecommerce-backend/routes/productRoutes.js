const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// GET semua produk
router.get("/", productController.getAllProducts);

// GET produk berdasarkan ID
router.get("/:id", productController.getProductById);

// POST buat produk baru
router.post("/", protect, adminMiddleware, productController.createProduct);

// PUT update produk
router.put("/:id", protect, productController.updateProduct);

// DELETE hapus produk
router.delete("/:id", protect, productController.deleteProduct);

// POST tambahkan review ke produk (perlu login)
router.post("/:id/reviews", protect, productController.addReview);

module.exports = router;
