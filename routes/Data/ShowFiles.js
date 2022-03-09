const express = require('express');
const router = express.Router();
const Files = require('../../models/Files');
const User = require('../../models/User');

router.get('/:user/:name', async (req, res) => {
    const fileName = req.params.name;
    const userName = await User.findOne({ username: req.params.user });
    const file = await Files.findOne({ FileName: fileName, user: userName });
    if (!file) {
        return res.status(400).json({
            success: false,
            message: 'File not found'
        })
    }
    const data = file.FileData;
    return res.writeHead(200, { 'Content-Type': file.FileType, }).end(Buffer.from(data, 'binary'));
})

module.exports = router;