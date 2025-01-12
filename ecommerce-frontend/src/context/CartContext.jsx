// src/context/CartContext.jsx
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Akses array items dalam response
      const data = res.data?.items || []; // Memastikan kita hanya mendapatkan array dari `items`

      if (Array.isArray(data)) {
        setCartItems(data);
      } else {
        console.warn("Data cart bukan array:", data);
        setCartItems([]); // reset untuk jaga-jaga
      }
    } catch (err) {
      console.error("Gagal mengambil data keranjang:", err);
      setCartItems([]); // reset untuk jaga-jaga
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, variation, quantity) => {
    if (!token) throw new Error("User belum login");

    await axios.post(
      "http://localhost:5000/api/cart/add",
      { productId, variation, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await fetchCart(); // refresh cart
  };

  const removeFromCart = async (cartItemId) => {
    if (!token) return;

    await axios.delete(`http://localhost:5000/api/cart/${cartItemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    await fetchCart();
  };

  const updateQuantity = async (cartItemId, quantity) => {
    if (!token) return;

    await axios.put(
      `http://localhost:5000/api/cart/${cartItemId}`,
      { quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    await fetchCart();
  };

  useEffect(() => {
    fetchCart(); // ambil ulang saat mount jika token tersedia
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, loading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
