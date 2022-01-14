// const { v4: uuidv4 } = require('uuid')
// const { uuid } = require('uuidv4');
const {v4: uuid} = require('uuid');
// const { uuid } = require('uuidv4');

module.exports = function (req, res, next) {
    if (!req.session.unauthId) {
        req.session.unauthId = uuid();
    }
    next();
}