const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const jwtSecret = config.authentication.secret;
const fetchuser = require('../../middleware/FetchUser');

router.post('/login', [
    body('username').not().isEmpty().withMessage('Enter a valid username'),
    body('password').not().isEmpty().withMessage('Password is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(200).json({
            success: false,
            message: 'Please enter all fields'
        });
    }
    let user = await User.findOne({ username: username });
    if (!user) {
        return res.status(200).json({
            success: false,
            message: 'User not found'
        });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(200).json({
            success: false,
            message: 'Incorrect password'
        })
    }
    const token = jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email,
        time: Date.now()
    }, jwtSecret, {
        expiresIn: '10d',
    })
    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        token: token,
    })
    return;
})

module.exports = router;