const { response } = require('express');
const ProductService = require('../services/ProductsService');

class SiteController {

    // [GET] /login
    login = async (req, res) => {
        res.render('login', {layout: false});
    }

    // [GET] /register
    register = async (req, res) => {
        res.render('register', {layout: false});
    }

    // [GET] /contact
    contact = async(req, res) => {
        res.render('contact');
    }

    // [GET] /
    home = async(req, res) => {
        const products = await ProductService.index();
        res.render('home', {
            layout: false,
            products});
    }
}

module.exports = new SiteController;