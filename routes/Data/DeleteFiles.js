const express = require('express');
const router = express.Router();
const fetchuser = require('../../middleware/FetchUser');
const Files = require('../../models/Files');
const User = require('../../models/User');
const Collection = require('../../models/Collection');


router.delete('/collection', async (req, res) => {
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
    const collection = req.body.collection;
    collection = await Collection.findOne({ Collection: collection, User: userData });
    if (!collection) {
        return res.status(400).json({
            success: false,
            message: 'Collection not found'
        })
    }
    try {
        const files = await Files.deleteMany({
            Collection: collection
        });
        collection = await Collection.deleteOne({ Collection: collection, User: userData });
        return res.status(200).json({
            success: true,
            message: 'Collection deleted successfully'
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Try Again, Some error Occured'
        })
    }
})

router.delete('/:collection/:file', async (req, res) => {
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
    const collection = req.params.collection;
    collection = await Collection.findOne({ Collection: collection, User: userData });
    if (!collection || collection.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Collection not found'
        })
    }
    const file = req.params.file;
    const fileData = await Files.findOne({ FileName: file, Collection: collection });
    if (!fileData || fileData.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'File not found'
        })
    } else {
        try {
            const files = await Files.deleteOne({
                FileName: file,
                Collection: collection
            });
            return res.status(200).json({
                success: true,
                message: 'File deleted successfully'
            })
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: 'Try Again, Some error Occured'
            })
        }
    }
})

module.exports = router;