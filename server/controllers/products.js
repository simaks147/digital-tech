const Product = require('../models/Product');
const {mapProduct} = require('../utils/mappers');

module.exports.productsBySubcategory = async (ctx, next) => {
  const {subcategoryId} = ctx.query;

  if (!subcategoryId) return next();

  const products = await Product.find({subcategoryId}).populate('brand');

  if (products.length === 0) ctx.throw(404, `No products in category '${subcategoryId}'`);

  ctx.body = {products: products.map(mapProduct)};
};

module.exports.productsList = async (ctx) => {
  const products = await Product.find().populate('brand');

  ctx.body = {products: products.map(mapProduct)};
};

module.exports.productBySlug = async (ctx) => {
  const slug = ctx.params.slug;

  const product = await Product.findOne({slug}).populate('brand');

  if (!product) ctx.throw(404, 'No such product');

  ctx.body = {product: mapProduct(product)};
};

module.exports.createProduct = async (ctx) => {
  const {
    brand, description, price, slug, subcategoryId, title, images, specification
  } = ctx.request.body;

  const product = await Product.create({
    brand, description, price, slug, subcategoryId, title, images, specification
  });

  await product.populate('brand');

  ctx.body = await new Promise(resolve => {
    setTimeout(() => {
      resolve({product: mapProduct(product)});
    }, 3000);
  });
};

module.exports.deleteProduct = async (ctx) => {
  await Product.deleteOne({slug: ctx.params.slug});

  ctx.body = {status: 'ok'};
};


