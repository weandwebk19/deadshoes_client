const { models } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getCartByUserId = async (id) => {
    const cart = await models.orders.findOne({
        where: {
            customerid: id,
        },
        raw: true,
    });
    return cart;
}

exports.getPurchaseCartByUserId = async (id) => {
    const carts = await models.orders.findAndCountAll({
        where: {
            customerid: id,
            deletedAt: {[Op.ne]: null},
        },
        raw: true,
        paranoid: false,
    });
    return carts;
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

exports.findDeletedProductById = async (orderid, productid, size) => {
    const flagNewItem = await models.order_products.findOne({
        where: {
            orderid: orderid,
            productid: productid,
            size: size
        },
        raw: true,
        paranoid: false,
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

exports.findAndCountAllDeletedCart = async (id) => {
    return await models.order_products.findAndCountAll({
        where: {
            orderid: id,
        },
        raw: true,
        paranoid: false,
    })
}

exports.findAndCountAllCart = async (id) => {
    return await models.order_products.findAndCountAll({
        where: {
            orderid: id,
        },
        raw: true,
    })
}

exports.findAndCountAllPurchased = async (id) => {
    return await models.order_products.findAndCountAll({
        where: {
            orderid: id,
            ispurchase: true,
        },
        raw: true,
        paranoid: false,
    })
}

exports.updatePurchased = async (orderid) => {
    return await models.order_products.update({ ispurchase: true }, {
        where: {
            orderid: orderid,
            ispurchase: false,
            deletedAt: null,
        },
    })
}

exports.deletePurchased = async (orderid) => {
    return await models.order_products.destroy({
        where: {
            orderid: orderid,
            ispurchase: true,
        }
    })
}

exports.deletePurchasedCart = async (orderid) => {
    return await models.orders.destroy({
        where: {
            orderid: orderid,
        }
    })
}

exports.restoreCart = async (orderid, productid, size) => {
    return await models.order_products.restore({
        where: {
            orderid: orderid,
            productid: productid,
            size: size,
        },
    })
}

exports.increaseCart = async (orderid, productid, amount, size) => {
    return await models.order_products.increment('amount', {
        where: {
            orderid: orderid,
            productid: productid,
            size: size,
        },
        by: amount,
    })
}

exports.decreaseCart = async (orderid, productid, amount, size) => {
    return await models.order_products.decrement('amount', {
        where: {
            orderid: orderid,
            productid: productid,
            size: size,
        },
        by: amount,
    })
}

exports.deleteCart = async (orderid, productid, size) => {
    await models.order_products.update({ amount: 0, }, {
        where: {
            orderid: orderid,
            productid: productid,
            size: size,
        },
    })
    return await models.order_products.destroy({
        where: {
            orderid: orderid,
            productid: productid,
            size: size,
        },
        // force: true,
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

exports.getTotalPrice = (id) => {

    return models.order_products.sum('price', {
        where: {
            orderid: id,
        }
    });
}

exports.updateCart = async (orderid, price) => {
    return await models.orders.update({
        price: price,
    }, {
        where: {
            orderid: orderid,
        }
    })
}