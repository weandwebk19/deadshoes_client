const { models } = require('../models');

exports.getCartByUserId = async (id) => {
    const cart = await models.orders.findOne({
        where: {
            customerid: id,
        },
        raw: true,
    });
    return cart;
}

exports.getCartProducts = async (id) => {
    const cart = await models.order_products.findAndCountAll({
        where: {
            orderid: id,
        },
        raw: true,
    });
    return cart;
}

exports.findProductById = async (orderid, productid, size) => {
    const flagNewItem = await models.order_products.findOne({
        where: {
            orderid: orderid,
            productid: productid,
            size: size
        },
        raw: true,
    });
    return flagNewItem;
}


exports.createCart = async (id) => {
    return await models.orders.create({
        customerid: id,
    });
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

exports.increaseCart = async (orderid, productid, size) => {
    return await models.order_products.increment('amount', {
        where: {
            orderid: orderid,
            productid: productid,
            size: size
        }
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
    });
}

exports.countCartItems = async (id) => {
    return await models.order_products.sum('amount', {
        where: {
            orderid: id,
        }
    });
}

exports.new = async (customerid) => {
    return await models.orders.create({
        customerid: customerid
    });
}

exports.index = () => {
    return models.orders.findAll({
        raw: true,
    });
}