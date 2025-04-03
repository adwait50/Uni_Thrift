const mongoose = require('mongoose');

const TenantAdSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  propertyPic: {
    type: String,  
    required: true
  },
  description: {
    type: Date,
    default: null
  },
  type: {
    type: String,
    required: true
  },
  rent: {
    type: String,
    required: true
  },
  status:{
    type: string,
    default : 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('TenantAd', TenantAdSchema);