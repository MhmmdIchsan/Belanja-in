const User = require('../models/User')

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')
  res.json(user)
}

exports.updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) user.password = req.body.password
    const updatedUser = await user.save()
    res.json({ message: 'Profile updated' })
  } else {
    res.status(404).json({ message: 'User not found' })
  }
}
