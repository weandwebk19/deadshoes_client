const { v4:uuid } = require('uuid');

module.exports = function (req, res, next) {
    if (!req.session.unauthId) {
        req.session.unauthId = uuid();
    }
    next();
}