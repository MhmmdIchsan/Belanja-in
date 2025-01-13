import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const ShippingModal = ({ isOpen, onClose, onOrderSuccess }) => {
  const { cartItems } = useCart();
  const { user } = useAuth();

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Menghitung total harga
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.variation.price * item.quantity,
    0
  );

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async () => {
    if (
      !shippingAddress.name ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.phone
    ) {
      setErrorMessage("Semua kolom alamat harus diisi.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const orderData = {
        shippingAddress,
        paymentMethod,
      };

      // Kirim request untuk membuat pesanan
      const response = await axios.post("http://localhost:5000/api/orders", orderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 201) {
        onOrderSuccess(response.data.order); // Panggil callback setelah sukses
        onClose(); // Tutup modal
      }
    } catch (error) {
      console.error("Gagal membuat pesanan:", error);
      setErrorMessage("Gagal membuat pesanan. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-50 ${isOpen ? "block" : "hidden"}`}
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:w-96 mx-auto mt-24 p-6 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Alamat Pengiriman</h2>

        {/* Form Alamat Pengiriman */}
        <form>
          <input
            type="text"
            name="name"
            placeholder="Nama"
            value={shippingAddress.name}
            onChange={handleAddressChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Alamat"
            value={shippingAddress.address}
            onChange={handleAddressChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="Kota"
            value={shippingAddress.city}
            onChange={handleAddressChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Kode Pos"
            value={shippingAddress.postalCode}
            onChange={handleAddressChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Nomor Telepon"
            value={shippingAddress.phone}
            onChange={handleAddressChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Metode Pembayaran</label>
            <select
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="cod">COD</option>
              <option value="transfer_bank">Transfer Bank</option>
              <option value="dompet_elektronik">Dompet Elektronik</option>
            </select>
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose} // Close modal button
              className="text-gray-500 hover:text-gray-700"
            >
              Tutup
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              {isSubmitting ? "Memproses..." : "Konfirmasi Pesanan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingModal;
