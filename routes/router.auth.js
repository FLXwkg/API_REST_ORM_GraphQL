// routes/auth.js
const express = require('express');
const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

/**
 * Login Route
 */
router.post('/login', async (req, res) => {
    const { email, password, hashPassword = true } = req.body; // Optional flag for hashing

    try {
        // Call the service for login
        const user = await UserService.loginUser(email, password, hashPassword);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email }, // Payload
            JWT_SECRET,
            { expiresIn: '1h' } // Token expiry
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
