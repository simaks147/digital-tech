const Product = require('../models/Product');

module.exports.productsBySubcategory = async (ctx, next) => {
  const {subcategoryId} = ctx.query;

  if (!subcategoryId) return next();

  const products = await Product.find({subcategoryId});

  ctx.body = {products};
};

module.exports.productsList = async (ctx) => {
  const products = await Product.find().limit(3);

  ctx.body = {products};
};

module.exports.productBySlug = async (ctx) => {
  const slug = ctx.params.slug;

  const product = await Product.findOne({slug});

  ctx.body = {product};
};


