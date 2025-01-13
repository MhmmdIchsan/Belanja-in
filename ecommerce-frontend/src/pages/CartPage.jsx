import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import NoResultComponent from "../components/NoResultsComponent";
import ShippingModal from "../components/ShippingModal";
import axios from "axios";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false); // Loading state saat proses pemesanan
  const [showShippingModal, setShowShippingModal] = useState(false);

  if (!user) return <Navigate to="/login" />;

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce(
        (total, item) => total + item.variation?.price * item.quantity,
        0
      )
    : 0;

  const handleQuantityChange = (cartItemId, value) => {
    const quantity = Math.max(1, parseInt(value));
    updateQuantity(cartItemId, quantity);
  };

  const handleOrderConfirmation = () => {
    console.log("Modal akan ditampilkan");
    setShowShippingModal(true); // Pastikan ini mengubah nilai menjadi true
  };

  const handleCreateOrder = async (shippingData) => {
    try {
      setIsProcessing(true);

      const orderData = {
        items: cartItems.map((item) => ({
          product: item.product._id,
          variation: item.variation,
          quantity: item.quantity,
          total: item.variation.price * item.quantity,
        })),
        totalAmount: totalPrice,
        shippingAddress: shippingData,
      };

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        // Redirect ke halaman pembayaran setelah pesanan dibuat
        navigate(`/payment/${response.data.order._id}`, {
          state: { status: "pending" },
        });
      }
    } catch (error) {
      console.error("Gagal membuat pesanan:", error);
    } finally {
      setIsProcessing(false);
      setShowShippingModal(false); // Menutup modal setelah proses selesai
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Keranjang Belanja Anda
      </h2>

      {cartItems.length === 0 ? (
        <NoResultComponent message="Keranjang Anda kosong." />
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-white shadow-md rounded-lg p-6"
            >
              <div className="flex items-center">
                <img
                  src={item.variation?.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg mr-6"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">
                    Variasi: {item.variation.color} / {item.variation.size}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Harga Satuan: Rp{" "}
                    {item.variation?.price?.toLocaleString("id-ID")}
                  </p>
                  <div className="flex items-center mt-1">
                    <label className="text-sm mr-2">Jumlah:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item._id, e.target.value)
                      }
                      className="w-16 p-2 border rounded-md"
                    />
                  </div>
                  <p className="text-md font-medium text-gray-700 mt-2">
                    Total: Rp{" "}
                    {(item.variation?.price * item.quantity).toLocaleString(
                      "id-ID"
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-sm bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Hapus
              </button>
            </div>
          ))}

          <div className="border-t pt-6 text-right">
            <h3 className="text-xl font-bold">
              Total:{" "}
              <span className="text-blue-600">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>
            </h3>

            <button
              onClick={handleOrderConfirmation}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Lanjutkan ke Pembayaran
            </button>
          </div>
        </div>
      )}

      {showShippingModal && (
        <ShippingModal
          isOpen={showShippingModal} // Kirim isOpen ke modal
          onClose={() => setShowShippingModal(false)} // Menutup modal
          onOrderSuccess={(order) => console.log(order)} // Callback setelah order sukses
        />
      )}
    </div>
  );
};

export default CartPage;
