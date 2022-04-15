const Router = require('koa-router');
const categoryList = require('./controllers/categories');
const {productsBySubcategory, productsList, productBySlug} = require('./controllers/products');
const reviewsByProduct = require('./controllers/reviews');

const router = new Router({
  prefix: '/api'
});

router.get('/categories', categoryList);
router.get('/products', productsBySubcategory, productsList);
router.get('/product/:slug', productBySlug);
router.get('/reviews', reviewsByProduct);

module.exports = router;
