const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware"); // kalau kamu pakai middleware

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/", protect, updateCartItem);
router.delete("/:productId", protect, removeFromCart);

module.exports = router;
