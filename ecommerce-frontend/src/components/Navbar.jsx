import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            {/* Logo Placeholder */}
            <img src="/src/assets/logo.png" alt="Logo" className="h-8 w-8 rounded-full" />
            <span className="text-xl font-bold text-white">Belanja-in</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="hover:text-gray-300 relative">
              <FiShoppingCart size={22} />
            </Link>
            {user ? (
              <>
                <span className="text-gray-300">Hi, {user.name || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="border border-white px-4 py-1 rounded hover:bg-white hover:text-gray-800 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-300">Login</Link>
                <Link to="/register" className="hover:text-gray-300">Register</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link to="/cart" className="block text-white hover:text-gray-300">
              <FiShoppingCart className="inline-block mr-1" />
              Cart
            </Link>
            {user ? (
              <>
                <div className="text-gray-300">Hi, {user.name || user.email}</div>
                <button
                  onClick={handleLogout}
                  className="w-full border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-gray-800 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-white hover:text-gray-300">Login</Link>
                <Link to="/register" className="block text-white hover:text-gray-300">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
