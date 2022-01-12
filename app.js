const createError = require('http-errors');
const dotenv = require('dotenv');
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const route = require('./app/routes');
const methodOverride = require('method-override');
const paginate = require('handlebars-paginate');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('./app/middleware/auth/passport');
const sessionHandler = require('./app/middleware/auth/sessionHandler');
const mylogger = require('./app/middleware/auth/logger');

const app = express();
dotenv.config({ path: '.env' });

// favicon
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

// view engine setup
app.engine('.hbs', exphbs({
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  helpers:
  {
    paginate: paginate,
    'limit': (arr, limit) => {
      if (arr.length > limit) {
        return arr.slice(0, limit);
      }
      return arr;
    },
    sum: function (a, b) {
      return a + b;
    },
    sub: function (a, b) {
      return a - b;
    },
    mul: function (a, b) { return a * b; },
    paginate: function (totalPages, totalItems, currentPage, options) {
      let result = [];

      if (currentPage == 0 || currentPage == 1 || currentPage == 2) {
        const displayPages = totalPages < 6 ? totalPages : 5;
        for (let i = 0; i < displayPages; i++) {
          if (i < totalPages)
            result.push(i);
        }
      }
      else {
        const displayPages = totalPages < 6 ? totalPages : 5;
        for (let i = -2; i < displayPages - 2; i++) {
          if (currentPage + i < totalPages)
            result.push(currentPage + i);
        }
      }
      return options.fn(result);
    },

    calcLimit: function (totalPages, totalItems, currentPage) {
      let limit;
      const temp = totalItems / totalPages;
      if (temp < 11) {
        limit = 10 * (currentPage + 1);
      }
      else if (temp < 26) {
        limit = 25 * (currentPage + 1);
      } else if (temp < 51) {
        limit = 50 * (currentPage + 1);
      }
      else if (temp < 101) {
        limit = 100 * (currentPage + 1);
      }
      return limit > totalItems ? totalItems : limit;
    },

    calcOffset: function (totalPages, totalItems, currentPage) {
      let limit;
      const temp = totalItems / totalPages;
      if (temp < 11) {
        limit = 10;
      }
      else if (temp < 26) {
        limit = 25;
      } else if (temp < 51) {
        limit = 50;
      }
      else if (temp < 101) {
        limit = 100;
      }

      return limit * currentPage + 1;
    },
  }
}));

//app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  cookie: {
    path: '/', 
    httpOnly: false,
    maxAge: 365 * 24 * 60 * 60 * 1000
  },
  secret: process.env.SESSION_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());

// middlewares
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
})

app.use(sessionHandler);
app.use(mylogger);

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
