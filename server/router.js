const Router = require('koa-router');
const session = require('./middleware/session');
const {mustBeAuthenticated} = require('./middleware/authentication');
const validationErrors = require('./middleware/validationErrors');
const categoryList = require('./controllers/categories');
const brandList = require('./controllers/brands');
const {
  productsBySubcategory,
  productsList,
  productBySlug,
  createProduct,
  deleteProduct,
  updateProduct
} = require('./controllers/products');
const {reviewsByProduct, createReview} = require('./controllers/reviews');
const login = require('./controllers/login');
const {oauth, oauthCallback} = require('./controllers/oauth');
const {register, confirm} = require('./controllers/registration');
const me = require('./controllers/me');
const {checkout} = require('./controllers/orders');
const authImages = require('./controllers/authImages');

const router = new Router({
  prefix: '/api'
});

router.use(session);

router.get('/categories', categoryList);
router.get('/brands', brandList);

router.get('/products', productsBySubcategory, productsList);

router.get('/product/:slug', productBySlug);
router.post('/product', validationErrors, createProduct);
router.del('/product/:slug', deleteProduct);
router.put('/product/:slug', validationErrors, updateProduct);

router.get('/reviews', reviewsByProduct);
router.post('/reviews', validationErrors, createReview);

router.post('/login', validationErrors, login);
router.get('/oauth/:provider', oauth);
router.post('/oauth_callback', validationErrors, oauthCallback);

router.get('/auth_images', authImages);

router.post('/register', validationErrors, register);
router.post('/confirm', confirm);

router.get('/me', mustBeAuthenticated, me);

router.post('/order', mustBeAuthenticated, validationErrors, checkout);

module.exports = router;
