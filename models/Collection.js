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
        unique: true
    }
})

const Collection = model('Collection', CollectionSchema);
module.exports = Collection;