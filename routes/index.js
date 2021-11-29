const cartRouter = require('./shopping-cart');
const productDetailRouter = require('./product-detail');
const productsRouter = require('./products');
const loginRouter = require('./login');
const contactRouter = require('./contact');
const homeRouter = require('./home');
const userRouter = require('./user');


function route(app) {
  app.use('/shopping-cart', cartRouter);
  app.use('/product-detail', productDetailRouter);
  app.use('/products', productsRouter);
  app.use('/login', loginRouter);
  app.use('/contact', contactRouter);
  app.use('/user', userRouter);
  app.use('/', homeRouter);
}

module.exports = route;
