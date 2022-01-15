const { models } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getWishlistByUserId = async (id) => {
    const wishlist = await models.wishlist.findOne({
        where: {
            customerid: id,
        },
        raw: true,
    });
    return wishlist;
}

exports.findAndCountAllDeletedWishlist = async (id) => {
    const wishlist = await models.wishlist_products.findAndCountAll({
        where: {
            wishlistid: id,
        },
        paranoid: false,
        raw: true,
    });
    return wishlist;
}

exports.findDeletedProductById = async (wishlistid, productid) => {
    const product = await models.wishlist_products.findOne({
        where: {
            wishlistid: wishlistid,
            productid: productid,
        },
        paranoid: false,
        raw: true,
    });
    return product;
}

exports.createWishlist = async (id) => {
    return await models.wishlist.create({
        customerid: id,
    })
}

exports.findAndCountAllWishlist = async (id) => {
    return await models.wishlist_products.findAndCountAll({
        where: {
            wishlistid: id,
        },
        raw: true,
    })
}

exports.deleteProductFromWishlist = async (wishlistid, productid) => {
    return await models.wishlist_products.destroy({
        where: {
            wishlistid: wishlistid,
            productid: productid,
        }
    })
}

exports.restoreWishlist = async (wishlistid, productid) => {
    return await models.wishlist_products.restore({
        where: {
            wishlistid: wishlistid,
            productid: productid,
        }
    })
}

exports.addToWishlist = async (wishlistid, productid) => {
    return await models.wishlist_products.create({
        wishlistid: wishlistid,
        productid: productid,
    })
}

exports.deleteProductFromWishlist = async (wishlistid, productid) => {
    return await models.wishlist_products.destroy({
        where: {
            wishlistid: wishlistid,
            productid: productid,
        }
    })
}