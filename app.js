const createError = require('http-errors');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const route = require('./app/routes');
const paginate = require('handlebars-paginate');
const exphbs = require('express-handlebars');
const helpers = require('handlebars-helpers');
const multiplehelpers = helpers();
const session = require('express-session');
const passport = require('./app/auth/passport');
const bcrypt = require('bcrypt');

const app = express();
dotenv.config({path: '.env'});

// view engine setup
app.engine('.hbs', exphbs({
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  helpers:
  {
    multiplehelpers,
    paginate: paginate,
    'limit': (arr, limit) => {
      if (arr.length > limit) {
        return arr.slice(0, limit);
      }
      return arr;
    },
  }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(session ({secret: process.env.SESSION_SECRET}));
app.use(passport.initialize());
app.use(passport.session());

// middlewares
app.use(function(req,res,next) {
  res.locals.user = req.user;
  next();
})

// routes
route(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
