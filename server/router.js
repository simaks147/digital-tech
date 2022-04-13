const Router = require('koa-router');
const categoryList = require('./controllers/categories');
// const { sliders, categories, products, reviews } = require('./mock');

const router = new Router({
  prefix: '/api'
});

// router.get('/categories', async (ctx) => {
//   await new Promise(resolve => setTimeout(resolve, 1000));
//   ctx.body = categories;
// });

router.get('/categories', categoryList);

module.exports = router;
