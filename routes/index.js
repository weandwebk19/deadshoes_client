const cartRouter = require('./shopping-cart');
const productDetailRouter = require('./product-detail');
const productsRouter = require('./products');
const loginRouter = require('./login');
const homeRouter = require('./home');


function route(app) {
  app.use('/shopping-cart', cartRouter);
  app.use('/product-detail', productDetailRouter);
  app.use('/products', productsRouter);
  app.use('/login', loginRouter);
  app.use('/', homeRouter);
}

module.exports = route;
