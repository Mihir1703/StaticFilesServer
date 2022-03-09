const Schema = require('mongoose').Schema;
const model = require('mongoose').model;
const Collection = require('./Collection');

const FilesSchema = new Schema({
    Collection: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Collection'
        }
    ],
    FileName: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 30,
        unique: true
    },
    FileData: {
        type: Buffer,
        required: true,
    },
    FileType: {
        type: String,
        required: true,
    }
})

const Files = model('Files', FilesSchema);
module.exports = Files;