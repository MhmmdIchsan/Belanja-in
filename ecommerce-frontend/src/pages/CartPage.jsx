import React from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const CartPage = () => {
  const { cart, removeFromCart } = useCart()
  const { user } = useAuth()
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  if (!user) { return <Navigate to="/login" /> }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border p-4 rounded-lg">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-xl font-semibold mt-6">Total: ${totalPrice.toFixed(2)}</div>
        </div>
      )}
    </div>
  )
}

export default CartPage
