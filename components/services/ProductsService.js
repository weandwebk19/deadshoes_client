const {models} = require('../../models')

exports.index = () => {
    return models.products.findAll({raw: true});
};