const express = require('express');
const router = express.Router();
const fetchuser = require('../../middleware/FetchUser');
const Files = require('../../models/Files');
const User = require('../../models/User');
const Collection = require('../../models/Collection');

router.post('/add', async (req, res) => {
    let collection = req.body.collection;
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
    collection = await Collection.findOne({ Collection: collection, User: userData });
    if (!collection) {
        return res.status(400).json({
            success: false,
            message: 'Collection not found'
        })
    }
    try {
        const files = await Files.create({
            Collection: collection,
            FileName: req.body.name,
            FileData: buffer[Object.keys(buffer)[0]].data,
            FileType: buffer[Object.keys(buffer)[0]].mimetype,
        });
        return res.status(200).json({
            success: true,
            message: 'File uploaded successfully'
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            success: false,
            message: 'File Name Already Exist'
        })
    }
})

router.post('/create/collection', async (req, res) => {
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
    const userData = await User.findOne({ username: data.username });
    try {
        const collection = await Collection.create({
            User: userData,
            Collection: req.body.collection
        });
        return res.status(200).json({
            success: true,
            message: 'Collection created successfully'
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Collection already exists'
        })
    }
})

router.post('/fetch/collections', async (req, res) => {
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
    const collections = await Collection.find({ User: userData }).select('Collection');

    return res.status(200).json({
        success: true,
        message: 'Collection fetched successfully',
        data: collections
    })
})

router.post('/fetch/:collections', async (req, res) => {
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

    Files.find({ User: userData, Collection: req.params.collections }).select('FileName').then(files => {
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