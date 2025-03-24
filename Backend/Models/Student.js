const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  studentEmail: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  currentAddress: {
    type: String,
    required: true
  },
  proofOfAdmission: {
    type: String,  
    required: true
  },
  role: {
    type: String,
    default: 'student'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationOTP: {
    type: String,
    default: null
  },
  otpExpiry: {
    type: Date,
    default: null
  },
  resetPasswordOTP: {
    type: String,
    default: null
  },
  resetPasswordExpiry: {
    type: Date,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);