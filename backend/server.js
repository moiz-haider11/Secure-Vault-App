require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Database logic

// Routes Import karna
const authRoutes = require('./routes/authRoutes');
const vaultRoutes = require('./routes/vaultRoutes'); // <--- Yeh naya wala hai

const app = express();

// --- Middleware ---
app.use(express.json()); // JSON data parhne ke liye
app.use(cors()); // Frontend connection allow karne ke liye

// --- Database Connection ---
connectDB();

// --- Routes Mount Karna ---
// 1. Authentication (Register/Login)
app.use('/api/auth', authRoutes);

// 2. Vault Items (Create/Access Secrets)
app.use('/api/vault', vaultRoutes);

// Test Route (Check karne ke liye)
app.get('/', (req, res) => {
    res.send('API is running... Vault App Backend');
});

// --- Server Start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});