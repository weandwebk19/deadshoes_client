const { models } = require('../models');

exports.getCartByUserId = async (id) => {
    const cart = await models.orders.findOne({
        where: {
            customerid: id,
        },
        raw: true,
    });
    return cart;
};

exports.createCart = async (id) => {
    const cart = await models.orders.create({
        customerid: id,
    });
    return cart;
}

exports.findCart = async (id) => {
    const cart = await models.orders.findOne({
        where: {
            customerid: id,
            raw: true,
        },
    });
    return cart;
}

exports.findAndCountAllCart = async (id) => {
    return await models.order_products.findAndCountAll({
        where: {
            orderid: id,
        },
        raw: true,
    })
}

exports.increaseCart = async (id) => {
    return await models.order_products.increment('amount', {
        where: { orderid: id }
    })
}

exports.addToCart = async (orderid, productid, amout, size) => {
    return await models.order_products.create({
        orderid: orderid,
        productid: productid,
        amount: amout,
        size: size,
    })
}

exports.add = async (id) => {

    return await models.products.findOne({
        where: {
            productid: id,
            raw: true,
        }
    })
}

exports.new = async (customerid) => {
    return await models.orders.create({
        customerid: customerid,

    })
}

exports.index = () => {
    return models.orders.findAll({
        raw: true,
    });
}