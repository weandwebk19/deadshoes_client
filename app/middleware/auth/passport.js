const passport = require('passport')
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const AuthService = require('../../services/AuthService');

passport.use(new LocalStrategy(
    // {
        //     usernameField: 'username',
        //     passwordField: 'password'
        // },
    {
    passReqToCallback: true
},
    function (req, username, password, done) {
        const Account = AuthService.getAccountByUsername(username);
        
        Account.then(async function (user) {
            if (!user) {
                console.log('User Not Found with username ' + username);
                return done(null, false, { message: 'Incorrect username.' });
            }
            const match = await validPassword(user, password);
            if (!match) {
                console.log('Invalid Password');
                return done(null, false, { message: 'Incorrect password.' });
            }
            console.log('username and password matched');

            return done(null, user);
        }).catch((err) => done(err));
    })
);

passport.serializeUser(function (user, done) {
    done(null, user.accountid);
});

passport.deserializeUser(function (id, done) {
    const Account = AuthService.getAccountById(id);
    Account.then(function (user) {
        done(null, user);
    }).catch(function (err) {
        if (err) {
            throw err;
        }
    });
});

async function validPassword(user, password) {
    return bcrypt.compare(password, user.password);
}

module.exports = passport;