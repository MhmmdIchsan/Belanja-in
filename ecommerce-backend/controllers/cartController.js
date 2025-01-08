const Cart = require('../models/Cart')

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product')
  res.json(cart || { items: [] })
}

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body
  let cart = await Cart.findOne({ user: req.user.id })
  if (!cart) {
    cart = new Cart({ user: req.user.id, items: [] })
  }

  const existingItem = cart.items.find(item => item.product.toString() === productId)
  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.items.push({ product: productId, quantity })
  }

  await cart.save()
  res.json(cart)
}

exports.removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id })
  if (!cart) return res.status(404).json({ message: 'Cart not found' })

  cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId)
  await cart.save()
  res.json(cart)
}
