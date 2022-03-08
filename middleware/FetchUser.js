let jwt = require('jsonwebtoken');
const config = require('../config.json')
const JWT_SECRET = config.authentication.secret;

const fetchuser = (token) => {
    if (!token) {
        return null;
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        return data
    } catch (error) {
        return Number.NaN;
    }

}

module.exports = fetchuser;