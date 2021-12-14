const { models } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// exports.pagin = async (term, color, price_start, price_end, limit = 2, skip) => {
//     const condition = (term||color||price_start||price_end) ? {
//         [Op.or]: [
//             { productname: { [Op.iLike]: `%${term}%` } },
//             { color: { [Op.iLike]: `%${color}%` } },
//             { price: {
//                 [Op.between]: [price_start, price_end]
//             } }
//         ]
//     } : null;
//     const result = await models.products.findAndCountAll({
//         where: condition,
//         limit: 2,
//         offset: skip,
//         raw: true,
//     });

//     console.log(result);
//     return result;
// }

exports.listProduct = (term, limit, offset) => {
    const condition = term ? {
        productname: { [Op.iLike]: `%${term}%` },
    } : null;

    return models.products.findAndCountAll({
        where: condition,
        limit: limit,
        offset: offset,
        raw: true,
    });
}

exports.filter = async (color, price_start, price_end, limit, offset) => {

    const result = await models.products.findAndCountAll({
        where: {
            color: { [Op.iLike]: `%${color}%` },
            price: {
                [Op.between]: [price_start, price_end]
            }
        },
        limit: limit,
        offset: offset,
        raw: true,
    });
    
    return result;
}

// exports.filter = (color, price_start, price_end, page = 0, itemPerPage = 9) => {
//     return models.products.findAndCountAll({
//         where: {
//             color: { [Op.iLike]: `%${color}%` },
//             price: { [Op.between]: [price_start, price_end] }
//         },
//         offset: page * itemPerPage,
//         limit: itemPerPage,
//         raw: true
//     });
// }

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
