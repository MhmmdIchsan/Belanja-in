// src/pages/Home.jsx
import React from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import categories from '../data/categories'
import BannerSlider from '../components/BannerSlider'
import ProductSection from '../components/ProductSection'

const Home = () => {
  const { addToCart } = useCart()
  const { user } = useAuth()

  const handleAdd = (product) => {
    if (!user) {
      alert('Silakan login untuk menambahkan produk ke keranjang.')
      return
    }
    addToCart(product)
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Banner Slider */}
        <BannerSlider />

        {/* Categories */}
        <div className="mt-10 mb-12 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 justify-center">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow hover:shadow-md transition text-center"
            >
              <div className="text-blue-600 text-2xl mb-2">{React.createElement(cat.icon)}</div>
              <span className="text-gray-700 text-sm font-medium">{cat.name}</span>
            </div>
          ))}
        </div>

        {/* Product Section with Filters */}
        <ProductSection categories={categories} />

      </div>
    </div>
  )
}

export default Home
