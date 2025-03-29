const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

module.exports = function create_token (auto_id, role) {
    return jwt.sign({auto_id, role}, "mysercret", {expiresIn : maxAge})
}