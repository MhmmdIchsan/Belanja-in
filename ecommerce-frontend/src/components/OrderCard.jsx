import React, { useState } from "react";
import OrderDetailModal from "./OrderDetailModal";

const statusProgress = {
  pending: 25,
  paid: 50,
  shipped: 75,
  completed: 100,
};

const statusLabel = {
  pending: "Menunggu Konfirmasi",
  paid: "Pembayaran Diterima",
  shipped: "Dikirim",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

const OrderCard = ({ order, isAdmin = false, onUpdateStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const firstItem = order.items[0]; // Ambil produk pertama dari order
  const progress = statusProgress[order.status] || 0;
  const label = statusLabel[order.status] || "Status Tidak Diketahui";

  return (
    <>
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4 transition hover:shadow-xl">
        <img
          src={firstItem.variation.image}
          alt={firstItem.product.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex-1 w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">{firstItem.product.name}</h3>
            <button
              onClick={() => setShowModal(true)}
              className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Lihat Detail
            </button>
          </div>
          <p className="text-gray-600">Status: {label}</p>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {showModal && (
        <OrderDetailModal
          order={order}
          isAdmin={isAdmin}
          onClose={() => setShowModal(false)}
          onUpdateStatus={onUpdateStatus}
        />
      )}
    </>
  );
};

export default OrderCard;
