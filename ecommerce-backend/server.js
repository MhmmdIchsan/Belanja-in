const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const chalk = require('chalk')
const authRoutes = require('./routes/authRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)

// Error Handling Middleware
app.use(notFound)
app.use(errorHandler)

// Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log(chalk.green('✅ MongoDB connected'))
  app.listen(process.env.PORT || 5000, () => {
    console.log(chalk.blue(`🚀 Server running on http://localhost:${process.env.PORT}`))
  })
})
.catch((err) => console.error(chalk.red('❌ MongoDB connection error:'), err))
