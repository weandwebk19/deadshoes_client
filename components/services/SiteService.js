const {models} = require('../../models')

exports.home = () => {
    return models.products.findAll({raw: true});
};