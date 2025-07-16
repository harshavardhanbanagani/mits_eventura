const app = require('./app')
const connectDB = require('./config/database')

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})

// Load environment variables
require('dotenv').config()

// Connect to database
connectDB()

const port = process.env.PORT || 5000

const server = app.listen(port, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${port}`)
  console.log(`📊 Admin Dashboard: http://localhost:${port}/admin`)
  console.log(`📚 API Documentation: http://localhost:${port}/api-docs`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully')
  server.close(() => {
    console.log('💥 Process terminated!')
  })
})