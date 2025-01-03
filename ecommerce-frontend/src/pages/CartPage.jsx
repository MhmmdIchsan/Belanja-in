import React from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const CartPage = () => {
  const { cart, removeFromCart } = useCart()
  const { user } = useAuth()
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  if (!user) return <Navigate to="/login" />

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white shadow-md rounded-lg p-6"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-1">Quantity: {item.quantity}</p>
                <p className="text-md font-medium text-gray-700">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="border-t pt-6 text-right">
            <h3 className="text-xl font-bold">
              Total:{' '}
              <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
            </h3>
            <button
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
