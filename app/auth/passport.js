const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const { models } = require("../models");
const account = require('../models').account_customers;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// passport.use(new LocalStrategy({
//     usernameField: 'username',
//     passwordField: 'password'
// },
//     function (username, password, done) {
//         console.log(username, password);
//         models.account_customers.findOne({
//             where: {
//                 username: { [Op.like]: username },
//             },
//             raw: true,
//         }, function (err, user) {
//             // console.log(user);
//             if (err) { return done(err); }
//             else if (!user) {
//                 return done(null, false, { message: 'Incorrect username.' });
//             }
//             else if (!validPassword(user, password)) {
//                 return done(null, false, { message: 'Incorrect password.' });
//             }
//             return done(null, user);
//         });
//     }
// ));

passport.use(new LocalStrategy({
    passReqToCallback: true
},
    function (req, username, password, done) {
        // check if user with username exists or not
        models.account_customers.findOne({
            where: {
                username: username
            }
        }).then(function (user) {
            if (!user) {
                console.log('User Not Found with username ' + username);
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!validPassword(user, password)) {
                console.log('Invalid Password');
                return done(null, false, { message: 'Incorrect password.' });
            }
            console.log('username and password matched');

            return done(null, user);
        }
        );
    })
);

passport.serializeUser(function (user, done) {
    done(null, user.accountid);
});

passport.deserializeUser(function (id, done) {
    models.account_customers.findOne({ where: { accountid: id } }).then(function (user) {
        console.log('deserializing user:', user);
        done(null, user);
    }).catch(function (err) {
        if (err) {
            throw err;
        }
    });
});

function validPassword(user, password) {
    return user.password === password;
}

module.exports = passport;