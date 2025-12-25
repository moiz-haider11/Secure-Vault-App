const express = require('express');
const router = express.Router();

// Controller Import
const { createVault, getMyVaults, accessVault } = require('../controllers/vaultController');

// Middleware Import (Naam: authMiddleware)
const authMiddleware = require('../middleware/authMiddleware');

// --- ROUTES ---

// 1. Create Vault (Isme Login Chahiye -> authMiddleware lagega)
router.post('/create', authMiddleware, createVault);

// 2. Get My Vaults (Isme bhi Login Chahiye)
router.get('/mine', authMiddleware, getMyVaults);

// 3. View Secret (Isme Login NAHI chahiye, koi bhi dekh sake link se)
router.post('/view/:id', accessVault);

module.exports = router;