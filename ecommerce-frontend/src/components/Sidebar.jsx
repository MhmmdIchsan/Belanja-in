import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'User Management', path: '/admin/users' },
    { name: 'Product Management', path: '/admin/products' },
    { name: 'Order Management', path: '/admin/orders' },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">Belanja-in Admin</h1>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'block p-2 rounded-lg bg-blue-500'
                  : 'block p-2 rounded-lg hover:bg-gray-700'
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;