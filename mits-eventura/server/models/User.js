const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: ['student', 'organizer', 'admin'],
    default: 'student'
  },
  rollNumber: {
    type: String,
    sparse: true, // Allows multiple null values
    match: [/^[0-9]{2}[A-Z]{2}[0-9]{4}$/, 'Please provide a valid roll number (e.g., 20CS1234)']
  },
  branch: {
    type: String,
    enum: [
      'Computer Science and Engineering',
      'Information Technology',
      'Electronics and Communication Engineering',
      'Electrical and Electronics Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Biotechnology',
      'Other'
    ]
  },
  year: {
    type: Number,
    min: 1,
    max: 4
  },
  phone: {
    type: String,
    match: [/^[6-9]\d{9}$/, 'Please provide a valid phone number']
  },
  avatar: {
    type: String,
    default: 'default-avatar.jpg'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  lastLogin: Date,
  loginCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true }
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto'
    }
  },
  socialLinks: {
    linkedin: String,
    github: String,
    portfolio: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Indexes for performance
UserSchema.index({ email: 1 })
UserSchema.index({ rollNumber: 1 })
UserSchema.index({ role: 1 })
UserSchema.index({ createdAt: -1 })

// Virtual for user's registrations
UserSchema.virtual('registrations', {
  ref: 'Registration',
  localField: '_id',
  foreignField: 'user',
  justOne: false
})

// Virtual for user's certificates
UserSchema.virtual('certificates', {
  ref: 'Certificate',
  localField: '_id',
  foreignField: 'user',
  justOne: false
})

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

  return resetToken
}

// Update last login
UserSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date()
  this.loginCount += 1
  return this.save({ validateBeforeSave: false })
}

module.exports = mongoose.model('User', UserSchema)