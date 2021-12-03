const express = require('express');
const passport = require('../auth/passport');
const router = express.Router();
// const bodyParser = require('body-parser');
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

const siteController = require('../controllers/SiteController');


router.get('/login', siteController.login);

router.post('/login',
    passport.authenticate('local'), 
    function (req, res) {
        console.log('passport auth success');
        if(req.user)
            res.redirect('/');
        else
            res.redirect('/login');
        // successRedirect: '/',
        // failureRedirect: '/login',
    },
);

router.get('/register', siteController.register);

module.exports = router;