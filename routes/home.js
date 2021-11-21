const express = require('express');
const router = express.Router();
const siteController = require('../components/controllers/SiteController');

/* GET home page. */
// router.get('/', function (req, res, next) {
//     res.render('home', {layout: false});
// });

router.get('/', siteController.home);

module.exports = router;