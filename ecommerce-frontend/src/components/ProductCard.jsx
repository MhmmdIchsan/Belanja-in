import React from 'react'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded" />
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
