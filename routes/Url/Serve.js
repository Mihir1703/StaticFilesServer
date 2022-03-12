const express = require('express');
const router = express.Router();
const config = require('../../config.json');
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
    if(data.old_url.includes('http://') || data.old_url.includes('https://')){
        res.redirect(data.old_url);
    }else{
        res.redirect('https://' + data.old_url);
    }
})

module.exports = router;