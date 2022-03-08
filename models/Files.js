const Schema = require('mongoose').Schema;
const model = require('mongoose').model;
const User = require('./User');

const FilesSchema = new Schema({
    User: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
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