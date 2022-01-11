const cartRouter = require('./shopping-cart');
const productsRouter = require('./products');
const authRouter = require('./auth');
// const loginRouter = require('./login');
// const registerRouter = require('./register');
const contactRouter = require('./contact');
const homeRouter = require('./home');
const userRouter = require('./user-information');
const checkoutRouter = require('./checkout');
const historyRouter = require('./history');


function route(app) {
  app.use('/checkout', checkoutRouter);
  app.use('/cart', cartRouter);
  app.use('/products', productsRouter);
  app.use('/user-information', userRouter);
  app.use('/', authRouter);
  // app.use('/login', loginRouter);
  // app.use('/register', registerRouter);
  app.use('/contact', contactRouter);
  app.use('/history', historyRouter);
  app.use('/', homeRouter);
}

module.exports = route;
