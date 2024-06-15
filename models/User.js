const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  appId: {
    type: Number,
    unique: true,
  },
  avatar: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  },
  name: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true,
    unique: true,
    validate: {
      validator: email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      message: 'Invalid email'
    }
  },
  phone: {
    type: String,
    unique: 'sparse',
    validate: {
      validator: phone => phone === null || /^\+\d{1,3}[- ]?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/.test(phone),
      message: 'Invalid phone number'
    },
    default: null
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  role: {
    type: String,
    enum: ['user', 'vendor', 'admin', 'superAdmin'],
    default: 'user'
  },
  password: {
    type: String,
    // required: true,
    validate: {
      validator: password => /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_=+-]).{8,}$/.test(password),
      message: 'Password must be at least 8 characters long, and contain at least one uppercase letter, one number, and one special character.'
    }
  },
  isPhoneVerified: {
    type: Boolean,
    default: false
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  accountStatus: {
    type: String,
    enum: ['online', 'offline', 'blocked', 'suspended'],
    default: 'offline'
  },
  isConfirmationEmailSent: {
    type: Boolean,
    default: false,
  },
  loginAttempts: {
    type: Number,
    default: 0,
  },
  facebookId: {
    type: String,
    unique: true,
    sparse: true
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  permissions: [{
    type: String,
  }],
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
