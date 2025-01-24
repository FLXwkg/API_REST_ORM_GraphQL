// routes/auth.js
const express = require('express');
const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken');
const SecurityService = require('../services/SecurityService');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticates a user and returns a JWT token.
 *     description: Validates the user's email and password. If valid, returns a JWT token to be used for subsequent requests.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: "securePassword123"
 *               hashPassword:
 *                 type: boolean
 *                 description: Optional flag indicating if the password should be hashed. Defaults to `true`.
 *                 example: true
 *     responses:
 *       200:
 *         description: Successfully authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for the authenticated user.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Authentication failed due to invalid email or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the failure reason.
 *                   example: "Invalid email or password"
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
