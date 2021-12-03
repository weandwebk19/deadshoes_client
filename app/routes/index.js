const cartRouter = require('./shopping-cart');
const productDetailRouter = require('./product-detail');
const productsRouter = require('./products');
const authRouter = require('./auth');
// const loginRouter = require('./login');
// const registerRouter = require('./register');
const contactRouter = require('./contact');
const homeRouter = require('./home');
const userRouter = require('./user');


function route(app) {
  app.use('/shopping-cart', cartRouter);
  app.use('/product-detail', productDetailRouter);
  app.use('/products', productsRouter);
  app.use('/', authRouter);
  // app.use('/login', loginRouter);
  // app.use('/register', registerRouter);
  app.use('/contact', contactRouter);
  app.use('/user', userRouter);
  app.use('/', homeRouter);
}

module.exports = route;
