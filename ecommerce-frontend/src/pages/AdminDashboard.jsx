import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const [userRes, productRes, orderRes] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/users", { headers }),
          axios.get("http://localhost:5000/api/admin/products", { headers }),
          axios.get("http://localhost:5000/api/admin/orders", { headers }),
        ]);
        setStats({
          users: userRes.data.length,
          products: productRes.data.length,
          orders: orderRes.data.length,
        });
      } catch (error) {
        console.error("Error fetching admin stats", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl mt-2">{stats.users}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-3xl mt-2">{stats.products}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-3xl mt-2">{stats.orders}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;