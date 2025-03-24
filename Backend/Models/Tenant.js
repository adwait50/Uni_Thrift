const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
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
  proofAadhaar: {
    type: String,  // This will store the file path/URL of the Aadhaar document
    required: true
  },
  proofOfAddress: {
    type: String,  // This will store the file path/URL of the address proof
    required: true
  },
  role: {
    type: String,
    default: 'tenant'
  }
}, { timestamps: true });

module.exports = mongoose.model('Tenant', TenantSchema);