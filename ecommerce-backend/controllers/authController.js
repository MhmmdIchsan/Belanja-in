const jwt = require('jsonwebtoken')
const User = require('../models/User')

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'User already exists' })

    const user = await User.create({ name, email, password })

    res.status(201).json({
      token: generateToken(user),
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid email or password' })

    const isMatch = await user.matchPassword(password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' })

    res.status(200).json({
      token: generateToken(user),
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}
