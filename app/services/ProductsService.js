const { models } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/*exports.filterByColor = (color, page = 0, itemPerPage = 9) => {
    return models.products.findAndCountAll({
        where: {
            color: {
                [Op.iLike]: `%${color}%`,
            }
        },
        offset: page * itemPerPage,
        limit: itemPerPage,
        raw: true
    });
}*/

exports.filter = (color, price_start, price_end, page = 0, itemPerPage = 9) => {
    return models.products.findAndCountAll({
        where: {
            color: {[Op.iLike]: `%${color}%`},
            price: {[Op.between]: [price_start, price_end]}
        },
        offset: page * itemPerPage,
        limit: itemPerPage,
        raw: true
    });
}

exports.searchByName = (term, page = 0, itemPerPage = 9) => {
    return models.products.findAndCountAll({
        where: {
            productname: { [Op.iLike]: '%' + term + '%' }
        },
        offset: (page * itemPerPage),
        limit: itemPerPage,
        raw: true,
    });
}

exports.show = (id) => {
    return models.products.findOne({
        where: { productid: id },
        raw: true,
    });
}

exports.index = (page = 0, itemPerPage = 9) => {

    return models.products.findAll({
        offset: (page * itemPerPage),
        limit: itemPerPage,
        raw: true,
    });
};
