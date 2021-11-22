const { models } = require('../../models')

exports.index = (page = 0, itemPerPage = 9) => {

    return models.products.findAll({
        offset: (page * itemPerPage),
        limit: itemPerPage,
        raw: true,
    });
};