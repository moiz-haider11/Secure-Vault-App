const mongoose = require('mongoose');

const VaultSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  maxViews: {
    type: Number,
    required: true
  },
  viewsLeft: {
    type: Number,
    required: true
  },
  passcode: {
    type: String,
    default: ''
  },
  expiresAt: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vault', VaultSchema);