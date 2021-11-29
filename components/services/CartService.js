const { models } = require('../../models');

exports.add = (id) => {

    // if product already in cart, increase quantity
    return models.orders.create({
        productid: id,
    });
}

exports.index = () => {
    return models.orders.findAll({
        raw: true,
    });
}