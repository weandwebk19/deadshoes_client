const { response } = require('express');
const ProductsService = require('../services/ProductsService');

class ProductController {

    // [POST] /products/filter/:slug
    /*filter(req, res, next) {
        let page = +req.query.page || 1;
        const perPage = 9;
        let color = req.body.data;

        const filterProd = ProductsService.filterByColor(color, !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);

        filterProd.then(products => {
            let view = {
                products: products.rows,
                layout: false,
                raw: true,
                pagination: {
                    page: req.query.page || 1,
                    pageCount: Math.ceil(products.count / perPage),
                }
            }
            res.render('products/searchProd', view);
        })
            .catch(next);
    }*/

    // [POST] /products/filter/:slug
     filter(req, res, next) {
        let page = +req.query.page || 1;
        const perPage = 9;
        let price_start = req.body.price_start;
        let price_end = req.body.price_end;
        let color = req.body.color;
        const filterProd = ProductsService.filter(color, price_start, price_end, !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);

        filterProd.then(products => {
            let view = {
                products: products.rows,
                layout: false,
                raw: true,
                pagination: {
                    page: req.query.page || 1,
                    pageCount: Math.ceil(products.count / perPage),
                }
            }
            res.render('products/searchProd', view);
        })
            .catch(next);
    }

    // [GET] /products/search
    search(req, res, next) {
        let page = +req.query.page || 1;
        const perPage = 9;
        let { term = '' } = req.query;

        term = term.toLowerCase();
        const products = ProductsService.searchByName(term, !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);

        console.log("my term: " + term);
        products.then(products => {
            res.render('products/products', {
                products: products.rows,
                pagination: {
                    page: req.query.page || 1,
                    pageCount: Math.ceil(products.count / perPage),
                },
                term: term,
            })
        })
            .catch(next);
    }

    // // [POST] /products/search (AJAX)
    // search (req, res, next) {
    //     let search = req.body.data;

    //     // res.send('my search: ' + search);
    //     //console.log('my search: ' + search);

    //     const searchProd = ProductsService.search(search, !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);

    //     searchProd.then(products => {
    //         let view = {
    //             products,
    //             layout: false,
    //             raw: true,
    //             pagination: {
    //                 page: req.query.page || 1,
    //                 pageCount: Math.ceil(products.count/perPage),
    //             }
    //         }
    //         res.render('products/searchProd', view);
    //     })
    // }


    // Display a certain product by its id
    // [GET] /products/:productid
    show = async (req, res, next) => {
        let page = +req.query.page || 1;
        const productDetail = ProductsService.show(req.params.productid);

        // const {brand} = productDetail;
        const relatedProd = await ProductsService.index(0, 8);
        // const relatedProducts = ProductService.index(0);

        productDetail.then(product => {
            res.render('products/product-detail', {
                product,
                relatedProd: relatedProd || null
            })
        }
        ).catch(next);
    }

    // [GET] /products
    index = async (req, res) => {
        const products = await ProductsService.index(!isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);
        res.render('products/products', {
            products,
            pagination: {
                page: req.query.page || 1,
                pageCount: 9
            }
        });
    }

    // [GET] /products/filter=string
    // filter = async (req, res) => {
    //     const products = await ProductService.filter(req.query.filter);
    //     res.render('products/products', {
    //         products,
    //         pagination: {
    //             page: req.query.page || 1,
    //             pageCount: perPage
    //         }
    //     });
    // }
}

module.exports = new ProductController;