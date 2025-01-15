import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi'
import { FaUserAlt } from 'react-icons/fa'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  // Close dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="bg-gray-800 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/src/assets/logo.png" alt="Logo" className="h-8 w-8 rounded-full" />
            <span className="text-xl font-bold text-white">Belanja-in</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                {/* Cart Icon */}
                <Link to="/cart" className="hover:text-gray-300 relative">
                  <FiShoppingCart size={24} />
                </Link>

                {/* Profile Icon with Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="text-gray-300 hover:text-gray-400 focus:outline-none"
                  >
                    <FaUserAlt size={24} />
                  </button>
                  {dropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out transform"
                    >
                      <ul>
                        <li>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 hover:bg-gray-200"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Profil Saya
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/orders"
                            className="block px-4 py-2 hover:bg-gray-200"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Pesanan Saya
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/about-us"
                            className="block px-4 py-2 hover:bg-gray-200"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Tentang Kami
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                          >
                            Keluar
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
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
