const Router = require('koa-router');
const categoryList = require('./controllers/categories');
const {productsBySubcategory} = require('./controllers/products');
// const { sliders, categories, products, reviews } = require('./mock');

const router = new Router({
  prefix: '/api'
});

// router.get('/categories', async (ctx) => {
//   await new Promise(resolve => setTimeout(resolve, 1000));
//   ctx.body = categories;
// });

router.get('/categories', categoryList);

router.get('/products', productsBySubcategory);

module.exports = router;
