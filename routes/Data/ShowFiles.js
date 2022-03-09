const express = require('express');
const Collection = require('../../models/Collection');
const router = express.Router();
const Files = require('../../models/Files');
const User = require('../../models/User');

router.get('/:user/:collection/:name', async (req, res) => {
    try {
        const fileName = req.params.name;
        const userName = await User.findOne({ username: req.params.user });
        req.params.collection = await Collection.findOne({ User: userName, Collection: req.params.collection });
        const file = await Files.findOne({ FileName: fileName, Collection: req.params.collection });
        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'File not found'
            })
        }
        const data = file.FileData;
        return res.writeHead(200, { 'Content-Type': file.FileType, }).end(Buffer.from(data, 'binary'));
    }catch(err){
        console.log(err)
        return res.status(400).json({
            success: false,
            message: 'URL not found'
        })
    }
})

module.exports = router;