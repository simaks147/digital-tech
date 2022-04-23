const Router = require('koa-router');
const validationErrors = require('./middleware/validationErrors');
const categoryList = require('./controllers/categories');
const {productsBySubcategory, productsList, productBySlug} = require('./controllers/products');
const {reviewsByProduct, createReview} = require('./controllers/reviews');
const login = require('./controllers/login');

const router = new Router({
  prefix: '/api'
});

router.get('/categories', categoryList);

router.get('/products', productsBySubcategory, productsList);
router.get('/product/:slug', productBySlug);

router.get('/reviews', reviewsByProduct);
router.post('/reviews', validationErrors, createReview);

router.post('/login', login);

module.exports = router;
