const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const config = require('../../config.json');
const fetchuser = require('../../middleware/FetchUser');
const UrlRedirect = require('../../models/Url');

router.get('/:site', [], async (req, res) => {
    const { site } = req.params;
    const data = await UrlRedirect.findOne({ new_url: site }).select('new_url old_url');
    if (!data || data.length == 0) {
        return res.status(404).json({
            success: false,
            message: 'Site not found'
        });
    }
    console.log(data);
})
router.post('/urls', [], async (req, res) => {
    const token = req.header('authtoken');
    let user = fetchuser(token);
    const { old_url, new_url } = req.body;
    if (!old_url || !new_url) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }
    if (user == null || user == Number.NaN) {
        return res.status(400).json({
            success: false,
            message: 'Please login to continue'
        });
    }
    user = await User.findOne({ username: user.username });
    const data = await UrlRedirect.create({
        User: user,
        old_url: old_url,
        new_url: new_url,
    });
    return res.status(200).json({
        success: true,
        message: 'Url created successfully',
    })
});

module.exports = router;