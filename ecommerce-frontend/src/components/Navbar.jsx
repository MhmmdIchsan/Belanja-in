import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import React, { useState } from 'react'

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
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-white">
            MyShop
          </Link>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            {user ? (
              <>
                <span className="text-gray-200">
                  Hello, {user.name || user.email || user._id}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-transparent border border-white text-white px-4 py-1 rounded hover:bg-white hover:text-gray-800 transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-300">
                  Login
                </Link>
                <Link to="/register" className="hover:text-gray-300">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2">
            {user ? (
              <>
                <div className="text-gray-300">Hello, {user.name || user.email || user._id}</div>
                <button
                  onClick={handleLogout}
                  className="block w-full bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-gray-800 transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-white hover:text-gray-300">
                  Login
                </Link>
                <Link to="/register" className="block text-white hover:text-gray-300">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
