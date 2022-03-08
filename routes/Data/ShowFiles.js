const express = require('express');
const router = express.Router();
const fetchuser = require('../../middleware/FetchUser');
const Files = require('../../models/Files');

router.get('/:name', async (req, res) => {
    const fileName = req.params.name;
    const file = await Files.findOne({ FileName: fileName });
    if (!file) {
        return res.status(400).json({
            success: false,
            message: 'File not found'
        })
    }
    const data = file.FileData;
    if (file.FileType === 'image') {
        return res.writeHead(200).end(Buffer.from(data, 'binary'));
    } else if (file.FileType === 'video') {
        return res.writeHead(200, { 'Content-Type': 'video/mp4', }).end(Buffer.from(data, 'binary'));
    }
})

module.exports = router;