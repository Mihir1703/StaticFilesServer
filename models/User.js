const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 12,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                if (email.includes('@') && email.includes('.')) {
                    return true;
                }
                return false
            }
        }
    },
    password: {
        type: String,
        required: true,
    }
})

const User = model('User', UserSchema);
module.exports = User;