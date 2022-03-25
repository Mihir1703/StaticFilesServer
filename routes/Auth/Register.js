const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const jwtSecret = config.authentication.secret;
const fetchuser = require('../../middleware/FetchUser');

router.post('/register', [
    body('username').not().isEmpty().withMessage('Enter a valid username'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').not().isEmpty().withMessage('Password is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }
    const salt = await bcrypt.genSalt(config.authentication.salt);
    let hashKey = await bcrypt.hash(password, salt);
    const user = await User.create({
        username: username,
        email: email,
        password: hashKey
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error creating user"
        });
    })
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
        message: 'User created successfully',
        token: token
    })
    return;
})

module.exports = router;