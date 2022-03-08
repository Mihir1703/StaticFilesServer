const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const jwtSecret = config.authentication.secret;
const fetchuser = require('../../middleware/FetchUser');

router.post('/verify', [], async (req, res) => {
    const token = req.header('authtoken');
    const data = fetchuser(token);
    if (!data) {
        return res.status(400).json({
            success: false,
            message: 'Invalid token'
        })
    } else if (data === Number.NaN) {
        return res.status(400).json({
            success: false,
            message: 'Internal error'
        })
    }
    return res.status(200).json({
        success: true,
        username: data.username,
        email: data.email,
        message: 'Token verified',
    })
})

module.exports = router;