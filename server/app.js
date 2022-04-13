// const router = require('express').Router();
// const { sliders, categories, products, reviews } = require('./mock');
// const { reply, getById } = require('./utils');
//
// router.get('/categories', (req, res, next) => {
//   reply(res, categories);
// });
//
// router.get('/products', (req, res, next) => {
//   const { subcategoryId } = req.query;
//
//   const result = products.filter(product => product.subcategoryId === subcategoryId);
//
//   reply(res, result);
// });
//
// router.get('/product', (req, res, next) => {
//   const { id } = req.query;
//
//   const result = products.find(product => product.slug === id);
//
//   reply(res, result);
// });
//
// router.get('/reviews', (req, res, next) => {
//   const { productId } = req.query;
//   let result = reviews;
//
//   if (productId) {
//     const product = products.find(product => product.slug === productId);
//
//     if (product) {
//       result = reviews.filter(review => review.productId === product.slug);
//     }
//   }
//
//   reply(res, result);
// });










// router.get('/users', (req, res, next) => {
//   reply(res, users);
// });

// const min = (m) => `you ordered for $${m}, but the min order amount is $50`;
// const max = (m) => `you ordered for $${m}, but the max order amount is $200`;
//
// router.post('/order', function (req, res, next) {
//   try {
//     const total = req.body
//       .map((it) => products.find((p) => p.id === it.id).price * it.amount)
//       .reduce((acc, next) => acc + next, 0);
//
//     if (total < 50) return reply(res, min(total), 3000, 400);
//     if (total > 200) return reply(res, max(total), 3000, 400);
//     return reply(res, 'ok', 3000);
//   } catch {
//     return reply(res, 'wrong data', 1000, 400);
//   }
// });






// module.exports = router;


const Koa = require('koa');
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');
const router = require('./router');

const app = new Koa();

app.use(cors());
app.use(bodyparser());
app.use(router.routes());

module.exports = app;
