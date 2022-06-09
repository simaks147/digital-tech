const Router = require('koa-router');
const session = require('./middleware/session');
const {mustBeAuthenticated} = require('./middleware/authentication');
const validationErrors = require('./middleware/validationErrors');
const categoryList = require('./controllers/categories');
const {productsBySubcategory, productsList, productBySlug} = require('./controllers/products');
const {reviewsByProduct, createReview} = require('./controllers/reviews');
const login = require('./controllers/login');
const {oauth, oauthCallback} = require('./controllers/oauth');
const {register, confirm} = require('./controllers/registration');
const me = require('./controllers/me');
const {checkout} = require('./controllers/orders');

const router = new Router({
  prefix: '/api'
});

router.use(session);

router.get('/categories', categoryList);

router.get('/products', productsBySubcategory, productsList);
router.get('/product/:slug', productBySlug);

router.get('/reviews', reviewsByProduct);
router.post('/reviews', validationErrors, createReview);

router.post('/login', validationErrors, login);
router.get('/oauth/:provider', oauth);
router.post('/oauth_callback', validationErrors, oauthCallback);

router.post('/register', validationErrors, register);
router.post('/confirm', confirm);

router.get('/me', mustBeAuthenticated, me);

router.post('/order', mustBeAuthenticated, validationErrors, checkout);

module.exports = router;
