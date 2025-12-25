const mongoose = require('mongoose');

const AccessLogSchema = new mongoose.Schema({
    vaultItem: { type: mongoose.Schema.Types.ObjectId, ref: 'VaultItem', required: true },
    timestamp: { type: Date, default: Date.now },
    outcome: { type: String, enum: ['ALLOWED', 'DENIED'], required: true },
    ipAddress: { type: String }, // Source metadata
    reason: { type: String } // e.g. "Expired", "Wrong Password", "Success"
});

module.exports = mongoose.model('AccessLog', AccessLogSchema);