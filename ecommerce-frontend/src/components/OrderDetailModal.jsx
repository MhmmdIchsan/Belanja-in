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

const OrderDetailModal = ({ order, isAdmin = false, onClose, onUpdateStatus }) => {
  const label = statusLabel[order.status] || "Status Tidak Diketahui";
  const { name, address, city, postalCode, phone } = order.shippingAddress;

  const handleStatusUpdate = (newStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(order._id, newStatus);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-black/40 to-black/10 backdrop-blur-sm">
      <div className="bg-white w-[360px] sm:w-[480px] max-h-[90vh] overflow-y-auto relative text-sm shadow-2xl border border-dashed border-gray-400 rounded-lg font-mono scale-95 opacity-0 transition-all duration-300 ease-out animate-fadeInZoom">
        <div className="p-6">
          <h2 className="text-center text-lg font-bold mb-4 border-b border-dashed border-gray-400 pb-2">
            *** STRUK PEMBELIAN ***
          </h2>

          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="border-b border-dashed border-gray-400 pb-2 mb-2">
                <div className="flex gap-4">
                  <img
                    src={item.variation.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">{item.product.name}</p>
                    <p className="text-xs">
                      Var: {item.variation.color} - {item.variation.size}
                    </p>
                    <p className="text-xs">Qty: {item.quantity}</p>
                    <p className="text-xs">
                      Harga: Rp {item.variation.price.toLocaleString()}
                    </p>
                    <p className="text-xs">
                      Subtotal: Rp {(item.variation.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="border-t border-b border-dashed border-gray-400 py-2 text-sm">
              <p>
                <strong>Status:</strong> {label}
              </p>
              <p>
                <strong>Total:</strong> Rp {order.totalAmount.toLocaleString()}
              </p>
              <p>
                <strong>Metode Bayar:</strong> {order.paymentMethod}
              </p>
            </div>

            <div className="text-sm pt-2">
              <p className="font-semibold underline">Alamat Pengiriman</p>
              <p>{name}</p>
              <p>
                {address}, {city}, {postalCode}
              </p>
              <p>{phone}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 items-center">
            <button
              onClick={onClose}
              className="bg-gray-700 text-white px-6 py-1.5 rounded-full hover:bg-gray-800 transition duration-300 w-full text-sm"
            >
              Tutup
            </button>

            {isAdmin && (
              <div className="flex flex-col gap-2 mt-2 w-full">
                {order.status === "pending" && (
                  <button
                    className="bg-yellow-500 text-white px-6 py-1.5 rounded-full hover:bg-yellow-600 transition duration-300 w-full text-sm"
                    onClick={() => handleStatusUpdate("paid")}
                  >
                    Konfirmasi Pesanan
                  </button>
                )}
                {order.status === "paid" && (
                  <button
                    className="bg-green-500 text-white px-6 py-1.5 rounded-full hover:bg-green-600 transition duration-300 w-full text-sm"
                    onClick={() => handleStatusUpdate("shipped")}
                  >
                    Pesanan Dikirim
                  </button>
                )}
                {order.status === "shipped" && (
                  <button
                    className="bg-blue-500 text-white px-6 py-1.5 rounded-full hover:bg-blue-600 transition duration-300 w-full text-sm"
                    onClick={() => handleStatusUpdate("completed")}
                  >
                    Tandai Selesai
                  </button>
                )}
              </div>
            )}
          </div>

          <p className="text-center text-xs mt-4 text-gray-500 border-t border-dashed border-gray-400 pt-2">
            ~ Terima Kasih Telah Berbelanja ~
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
