// routes/auth.js
const express = require('express');
const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken');
const SecurityService = require('../services/SecurityService');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

/**
 * Login Route
 */
router.post('/login', async (req, res) => {
    const { email, password, hashPassword = true } = req.body; // Optional flag for hashing

    // Call the service for login
    const user = await UserService.loginUser(email, password, hashPassword);

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = SecurityService.issueToken(user);

    res.json({ token });
});

module.exports = router;
