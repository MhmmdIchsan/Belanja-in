import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderSummaryPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/${orderId}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        setOrder(response.data);
      } catch (error) {
        console.error("Gagal mengambil ringkasan pesanan:", error);
      }
    };
    fetchOrderSummary();
  }, [orderId]);

  if (!order) return <div>Memuat...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Ringkasan Pesanan</h2>
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Detail Pesanan</h3>
        <ul className="space-y-4">
          {order.items.map((item) => (
            <li key={item._id} className="flex justify-between">
              <span>{item.product.name} ({item.variation.color}/{item.variation.size})</span>
              <span>{`Rp ${item.variation.price.toLocaleString("id-ID")}`}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-between items-center">
          <h3 className="text-xl font-bold">Total: </h3>
          <span className="text-blue-600">{`Rp ${order.totalPrice.toLocaleString("id-ID")}`}</span>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-semibold">Status Pesanan: </h4>
          <p>{order.status === "paid" ? "Pesanan telah dibayar" : "Pesanan belum dibayar"}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
