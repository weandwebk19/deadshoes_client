const { response } = require('express');
const ProductService = require('../services/ProductsService');
const siteService = require('../services/SiteService');

class SiteController {


    //[GET] /myaccount
    myAccount = async (req, res) => {
        console.log(req.user.customerid);
        const customer = await siteService.user(req.user.customerid);
        console.log(customer.name, customer.email);
        res.render('user-information', {customer});
    }

    // [GET] /login
    login = async (req, res) => {
        res.render('login', {
            layout: false,
            wrongPassword: req.query.wrongPassword !== undefined
        });
    }

    // [GET] /register
    register = async (req, res) => {
        res.render('register', { layout: false });
    }

    // [GET] /contact
    contact = async (req, res) => {
        res.render('contact');
    }

    // [GET] /
    home = async (req, res) => {
        const products = await ProductService.index();
        res.render('home', {
            layout: false,
            products
        });
    }
}

module.exports = new SiteController;