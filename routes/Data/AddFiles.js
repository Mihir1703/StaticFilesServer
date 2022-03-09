const express = require('express');
const router = express.Router();
const fetchuser = require('../../middleware/FetchUser');
const Files = require('../../models/Files');
const User = require('../../models/User');

router.post('/addfile', async (req, res) => {
    const token = req.header('authtoken');
    const data = fetchuser(token);
    if (!data) {
        return res.status(400).json({
            success: false,
            message: 'Invalid token'
        })
    }
    else if (data === Number.NaN) {
        return res.status(400).json({
            success: false,
            message: 'Internal error'
        })
    }
    if (!req.files) {
        return res.status(400).json({
            success: false,
            message: 'No files were uploaded'
        })
    }
    let userData = await User.findOne({ username: data.username });
    const buffer = req.files;
    if (!buffer) {
        return res.status(400).json({
            success: false,
            message: 'No files were uploaded'
        })
    }
    try{
        console.log(buffer[Object.keys(buffer)[0]].mimetype)
        const files = await Files.create({
            User: userData,
            FileName: req.body.name,
            FileData: buffer[Object.keys(buffer)[0]].data,  
            FileType: buffer[Object.keys(buffer)[0]].mimetype,
        });
        return res.status(200).json({
            success: true,
            message: 'File uploaded successfully'
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({
            success: false,
            message: 'File Name Already Exist'
        })
    }
})

router.get('/getfiles', async (req, res) => {
    const token = req.header('authtoken');
    const data = fetchuser(token);
    if (!data) {
        return res.status(400).json({
            success: false,
            message: 'Invalid token'
        })
    }
    else if (data === Number.NaN) {
        return res.status(400).json({
            success: false,
            message: 'Internal error'
        })
    }
    let userData = await User.findOne({ username: data.username });
    Files.find({User : userData}).select('FileName').then(files => {
        if (files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files found'
            })
        }
        let fileNames = [];
        files.forEach(file => {
            fileNames.push(file.FileName);
        })
        return res.status(200).json({
            success: true,
            message: 'Files found',
            files: fileNames,
        });
    })
})

module.exports = router;