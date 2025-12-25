const mongoose = require('mongoose');

const VaultItemSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true }, // Sensitive text
    passcode: { type: String }, // Optional access password (hashed)
    
    // Race-condition safety ke liye hum 'viewsLeft' use karenge
    maxViews: { type: Number, required: true }, 
    viewsLeft: { type: Number, required: true }, 
    
    expiresAt: { type: Date, required: true },
    isLocked: { type: Boolean, default: false }, // Agar views 0 ho gaye
}, { timestamps: true });

module.exports = mongoose.model('VaultItem', VaultItemSchema);