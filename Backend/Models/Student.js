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
    type: String,  // This will store the file path/URL of the uploaded document
    required: true
  },
  role: {
    type: String,
    default: 'student'
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);