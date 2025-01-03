import React from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const products = [
  {
    id: 1,
    name: 'Sneakers',
    description: 'Comfortable and stylish sneakers.',
    price: 49.99,
    image: 'https://via.placeholder.com/300x200?text=Sneakers',
  },
  {
    id: 2,
    name: 'Backpack',
    description: 'Durable backpack for travel or school.',
    price: 39.99,
    image: 'https://via.placeholder.com/300x200?text=Backpack',
  },
  {
    id: 3,
    name: 'Watch',
    description: 'Elegant watch with leather strap.',
    price: 79.99,
    image: 'https://via.placeholder.com/300x200?text=Watch',
  },
]

const Home = () => {
  const { addToCart } = useCart()
  const { user } = useAuth()

  const handleAdd = (product) => {
    if (!user) {
      alert('Please log in to add items to your cart.')
      return
    }
    addToCart(product)
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Welcome to Our Shop
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <p className="text-lg font-bold text-gray-900 mb-4">
                    ${product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleAdd(product)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
