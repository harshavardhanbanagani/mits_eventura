const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add an event title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please specify event category'],
    enum: [
      'Technical',
      'Cultural',
      'Sports',
      'Workshop',
      'Seminar',
      'Competition',
      'Exhibition',
      'Gaming',
      'Literary',
      'Arts',
      'Other'
    ]
  },
  type: {
    type: String,
    required: [true, 'Please specify event type'],
    enum: ['Individual', 'Team', 'Both']
  },
  venue: {
    type: String,
    required: [true, 'Please add event venue'],
    maxlength: [200, 'Venue cannot be more than 200 characters']
  },
  startDate: {
    type: Date,
    required: [true, 'Please add start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please add end date'],
    validate: {
      validator: function(value) {
        return value >= this.startDate
      },
      message: 'End date must be after start date'
    }
  },
  registrationStartDate: {
    type: Date,
    required: [true, 'Please add registration start date']
  },
  registrationEndDate: {
    type: Date,
    required: [true, 'Please add registration end date'],
    validate: {
      validator: function(value) {
        return value >= this.registrationStartDate && value <= this.startDate
      },
      message: 'Registration end date must be between registration start and event start date'
    }
  },
  maxParticipants: {
    type: Number,
    required: [true, 'Please add maximum participants limit'],
    min: [1, 'Maximum participants must be at least 1']
  },
  teamSize: {
    min: {
      type: Number,
      default: 1,
      min: [1, 'Minimum team size must be at least 1']
    },
    max: {
      type: Number,
      default: 1,
      min: [1, 'Maximum team size must be at least 1']
    }
  },
  registrationFee: {
    type: Number,
    default: 0,
    min: [0, 'Registration fee cannot be negative']
  },
  prizeMoney: {
    first: { type: Number, default: 0 },
    second: { type: Number, default: 0 },
    third: { type: Number, default: 0 }
  },
  organizer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  coordinators: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    name: String,
    phone: String,
    email: String
  }],
  rules: [{
    type: String,
    maxlength: [500, 'Each rule cannot be more than 500 characters']
  }],
  requirements: [{
    type: String,
    maxlength: [200, 'Each requirement cannot be more than 200 characters']
  }],
  images: [{
    url: String,
    caption: String
  }],
  poster: {
    type: String,
    default: 'default-event-poster.jpg'
  },
  status: {
    type: String,
    enum: ['Draft', 'Published', 'Cancelled', 'Completed'],
    default: 'Draft'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  metadata: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 }
  },
  certificateTemplate: {
    type: String,
    default: 'default-certificate.html'
  },
  externalLinks: {
    website: String,
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Indexes for performance
EventSchema.index({ category: 1 })
EventSchema.index({ startDate: 1 })
EventSchema.index({ status: 1 })
EventSchema.index({ organizer: 1 })
EventSchema.index({ registrationEndDate: 1 })
EventSchema.index({ createdAt: -1 })
EventSchema.index({ title: 'text', description: 'text' })

// Virtual for event registrations
EventSchema.virtual('registrations', {
  ref: 'Registration',
  localField: '_id',
  foreignField: 'event',
  justOne: false
})

// Virtual for registration count
EventSchema.virtual('registrationCount', {
  ref: 'Registration',
  localField: '_id',
  foreignField: 'event',
  count: true
})

// Virtual for available spots
EventSchema.virtual('availableSpots').get(function() {
  return this.maxParticipants - (this.registrationCount || 0)
})

// Virtual for registration status
EventSchema.virtual('registrationStatus').get(function() {
  const now = new Date()
  
  if (now < this.registrationStartDate) {
    return 'upcoming'
  } else if (now > this.registrationEndDate) {
    return 'closed'
  } else if (this.registrationCount >= this.maxParticipants) {
    return 'full'
  } else {
    return 'open'
  }
})

// Virtual for event status
EventSchema.virtual('eventStatus').get(function() {
  const now = new Date()
  
  if (this.status === 'Cancelled') {
    return 'cancelled'
  } else if (now < this.startDate) {
    return 'upcoming'
  } else if (now >= this.startDate && now <= this.endDate) {
    return 'ongoing'
  } else {
    return 'completed'
  }
})

// Middleware to validate team size for team events
EventSchema.pre('save', function(next) {
  if (this.type === 'Individual') {
    this.teamSize.min = 1
    this.teamSize.max = 1
  } else if (this.type === 'Team' && this.teamSize.max < this.teamSize.min) {
    return next(new Error('Maximum team size must be greater than or equal to minimum team size'))
  }
  next()
})

module.exports = mongoose.model('Event', EventSchema)