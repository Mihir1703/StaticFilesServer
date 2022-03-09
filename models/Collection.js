const Schema = require('mongoose').Schema;
const model = require('mongoose').model;
const User = require('./User');

const CollectionSchema = new Schema({
    User: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    Collection: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 30,
    }
})

const Collection = model('Collection', CollectionSchema);
module.exports = Collection;