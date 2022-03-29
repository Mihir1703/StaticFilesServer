const Schema = require('mongoose').Schema;
const model = require('mongoose').model;
const User = require('./User');

const UrlRedirectSchema = new Schema({
    User: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    old_url: {
        type: String,
        required: true
    },
    new_url: {
        type: String,
        required: true,
        unique: true
    }
})

const UrlRedirect = model('UrlRedirect', UrlRedirectSchema);
module.exports = UrlRedirect;