const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies.jwt) {
    // Get token from cookie
    token = req.cookies.jwt
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Get user from token
    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      })
    }

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    })
  }
}

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`
      })
    }
    next()
  }
}

// Check if user owns the resource or is admin
const authorizeOwnership = (resourceField = 'user') => {
  return (req, res, next) => {
    // Admin can access everything
    if (req.user.role === 'admin') {
      return next()
    }

    // Get resource ID from params or body
    const resourceId = req.params.id || req.body.id

    // If checking user ownership via params
    if (resourceField === 'user' && req.params.userId) {
      if (req.user._id.toString() !== req.params.userId) {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to access this resource'
        })
      }
    }

    next()
  }
}

// Optional auth - doesn't throw error if no token
const optionalAuth = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
    } catch (error) {
      // Continue without user if token is invalid
      req.user = null
    }
  }

  next()
}

module.exports = {
  protect,
  authorize,
  authorizeOwnership,
  optionalAuth
}