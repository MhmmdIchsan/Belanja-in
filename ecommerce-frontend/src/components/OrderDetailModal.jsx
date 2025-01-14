import React from "react";

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

const OrderDetailModal = ({
  order,
  isAdmin = false,
  onClose,
  onUpdateStatus,
}) => {
  const firstItem = order.items[0]; // Ambil produk pertama dari order
  const progress = statusProgress[order.status] || 0;
  const label = statusLabel[order.status] || "Status Tidak Diketahui";

  const {
    name,
    address,
    city,
    postalCode,
    phone,
  } = order.shippingAddress; // Ambil data alamat pengiriman

  const handleStatusUpdate = (newStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(order._id, newStatus);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md p-4 relative text-sm font-mono shadow-lg">
        <h2 className="text-center text-xl font-bold mb-4">STRUK PEMBELIAN</h2>

        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 border-b border-gray-300 pb-2 mb-2">
              <img
                src={item.variation.image}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h4 className="font-semibold">{item.product.name}</h4>
                <p className="text-xs text-gray-500">
                  Variasi: {item.variation.color} - {item.variation.size}
                </p>
                <p className="text-xs text-gray-500">
                  Jumlah: {item.quantity} | Harga: Rp {item.variation.price.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  Subtotal: Rp {(item.variation.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          <div className="mt-4">
            <p><strong>Status:</strong> {label}</p>
            <p><strong>Total:</strong> Rp {order.totalAmount.toLocaleString()}</p>
            <p><strong>Alamat Pengiriman:</strong></p>
            <p>{name}</p>
            <p>{address}, {city}, {postalCode}</p>
            <p>{phone}</p>
            <p><strong>Metode Pembayaran:</strong> {order.paymentMethod}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 items-center">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition duration-300 w-full"
          >
            Tutup
          </button>

          {isAdmin && (
            <div className="flex flex-col gap-2 mt-4 w-full">
              {order.status === "pending" && (
                <button
                  className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition duration-300 w-full"
                  onClick={() => handleStatusUpdate("paid")}
                >
                  Konfirmasi Pesanan
                </button>
              )}
              {order.status === "paid" && (
                <button
                  className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300 w-full"
                  onClick={() => handleStatusUpdate("shipped")}
                >
                  Pesanan Dikirim
                </button>
              )}
              {order.status === "shipped" && (
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 w-full"
                  onClick={() => handleStatusUpdate("completed")}
                >
                  Tandai Selesai
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
