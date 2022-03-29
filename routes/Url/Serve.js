const express = require('express');
const router = express.Router();
const config = require('../../config.json');
const UrlRedirect = require('../../models/Url');
const User = require('../../models/User');

router.get('/:username/:site', [], async (req, res) => {
    const { site } = req.params;
    const user = await User.findOne({ username: req.params.username });
    const data = await UrlRedirect.findOne({ new_url: site, User: user }).select('new_url old_url');
    if (!data || data.length == 0) {
        return res.status(404).json({
            success: false,
            message: 'Site not found'
        });
    }
    res.redirect(data.old_url);
})

module.exports = router;