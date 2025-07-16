const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cookieParser = require('cookie-parser')
const path = require('path')

// Import custom middleware
const rateLimiter = require('./middleware/rateLimiter')
const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')

// Import routes
const authRoutes = require('./routes/authRoutes')
const eventRoutes = require('./routes/eventRoutes')
const registrationRoutes = require('./routes/registrationRoutes')
const certificateRoutes = require('./routes/certificateRoutes')
const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes')

// Create Express app
const app = express()

// Trust proxy for rate limiting
app.set('trust proxy', 1)

// Security Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
    },
  },
}))

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.CORS_ORIGIN || 'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5173',
      'https://eventura.mits.ac.in'
    ]
    
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}

app.use(cors(corsOptions))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// Security middleware
app.use(mongoSanitize()) // Prevent NoSQL injection attacks
app.use(xss()) // Clean user input from malicious HTML
app.use(hpp()) // Prevent parameter pollution

// Compression middleware
app.use(compression())

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(morgan('combined'))
}

// Rate limiting
app.use('/api', rateLimiter)

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/certificates', express.static(path.join(__dirname, 'certificates')))

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'MITS Eventura API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0.0'
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/registrations', registrationRoutes)
app.use('/api/certificates', certificateRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/users', userRoutes)

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  })
}

// API documentation route
app.get('/api-docs', (req, res) => {
  res.json({
    message: 'MITS Eventura API Documentation',
    version: '1.0.0',
    endpoints: {
      auth: {
        'POST /api/auth/register': 'Register a new user',
        'POST /api/auth/login': 'Login user',
        'POST /api/auth/logout': 'Logout user',
        'GET /api/auth/me': 'Get current user profile',
        'PUT /api/auth/profile': 'Update user profile',
        'PUT /api/auth/change-password': 'Change user password',
      },
      events: {
        'GET /api/events': 'Get all events',
        'POST /api/events': 'Create new event',
        'GET /api/events/:id': 'Get single event',
        'PUT /api/events/:id': 'Update event',
        'DELETE /api/events/:id': 'Delete event',
      },
      registrations: {
        'POST /api/registrations': 'Register for event',
        'GET /api/registrations/user/:userId': 'Get user registrations',
        'GET /api/registrations/event/:eventId': 'Get event registrations',
        'PUT /api/registrations/:id/status': 'Update registration status',
      },
      certificates: {
        'GET /api/certificates/user/:userId': 'Get user certificates',
        'POST /api/certificates/generate/:registrationId': 'Generate certificate',
        'GET /api/certificates/download/:id': 'Download certificate',
        'POST /api/certificates/bulk/:eventId': 'Bulk generate certificates',
      },
      admin: {
        'GET /api/admin/dashboard': 'Get admin dashboard stats',
        'GET /api/admin/users': 'Get all users',
        'PUT /api/admin/users/:id/role': 'Update user role',
        'DELETE /api/admin/users/:id': 'Delete user',
      }
    }
  })
})

// Handle 404 routes
app.use(notFound)

// Global error handler
app.use(errorHandler)

module.exports = app