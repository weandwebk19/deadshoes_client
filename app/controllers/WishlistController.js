const WishlistService = require('../services/WishlistService');
const ProductsService = require('../services/ProductsService');
const AuthService = require('../services/AuthService');

class WishlistController {

    // [POST] /wishlist/:productid
    add = async (req, res, next) => {
        const { user } = req;
        let wishlist = await WishlistService.getWishlistByUserId(user.customerid);
        const { productid } = req.params;
        console.log(productid);

        try {
            const product = await ProductsService.show(productid);

            if (!product) throw new Error('Can not find product!');

            if (wishlist) {
                let wishlistProducts = await WishlistService.findAndCountAllDeletedWishlist(wishlist.wishlistid);

                if (wishlistProducts.count != 0) {
                    const currProductInWishlist = await WishlistService.findDeletedProductById(wishlist.wishlistid, productid);
                    console.log(currProductInWishlist);
                    if (currProductInWishlist && currProductInWishlist.deletedAt == null) {
                        console.log('this is old item - delete');
                        await WishlistService.deleteProductFromWishlist(wishlist.wishlistid, productid);
                    }
                    else if (currProductInWishlist && currProductInWishlist.deletedAt != null) {
                        let existedProduct = await WishlistService.findDeletedProductById(wishlist.wishlistid, productid);
                        if (existedProduct) {
                            console.log('this is deleted item - add');
                            await WishlistService.restoreWishlist(wishlist.wishlistid, existedProduct.productid);
                        }
                    }
                    else {
                        console.log('this is new item - create');
                        await WishlistService.addToWishlist(wishlist.wishlistid, productid);
                    }
                }

                if (wishlistProducts.count == 0) {
                    console.log('this is new item - add to wishlist');
                    await WishlistService.addToWishlist(wishlist.wishlistid, productid);
                }
            } else {
                console.log('this is new item - create wishlist');
                await WishlistService.createWishlist(user.customerid);
                wishlist = await WishlistService.getWishlistByUserId(user.customerid);
                await WishlistService.addToWishlist(wishlist.wishlistid, productid);
            }

            // req.session.wishlist = wishlistProducts;
            res.status(200).json({
                msg: 'success',
            });

        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'ValidatorError',
                user: error.message,
            });
        }
    }

    // [DELETE] /wishlist/:product
    destroy = async (req, res, next) => {
        const { productid } = req.params;
        const { user } = req;

        const wishlist = await WishlistService.getWishlistByUserId(user.customerid);
        const product = await ProductsService.show(productid);
        if (!product) throw new Error('Can not find product!');

        await WishlistService.deleteProductFromWishlist(wishlist.wishlistid, productid);

        res.redirect('back');
    }

    // [GET] /wishlist
    index = async (req, res, next) => {
        const { user } = req;
        let wishlist;

        if (user) {
            const userWish = await WishlistService.getWishlistByUserId(user.customerid);
            if (!userWish) {
                wishlist = await WishlistService.createWishlist(user.customerid);
            } else {
                wishlist = userWish;
            }
        }

        const wishlistProd = await WishlistService.findAndCountAllWishlist(wishlist.wishlistid);

        const wishlistProductsDetail = [];

        for (let i = 0; i < wishlistProd.count; i++) {
            const product = await ProductsService.show(wishlistProd.rows[i].productid);
            wishlistProductsDetail.push({ product });
        }

        res.render('wishlist', {
            wishlist,
            wishlistProd,
            wishlistProductsDetail,
        });
    }
}

module.exports = new WishlistController;