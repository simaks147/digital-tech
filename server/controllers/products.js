const Product = require('../models/Product');
const {mapProduct} = require('../utils/mappers');
const mongoose = require("mongoose");

// module.exports.productsBySubcategory = async (ctx, next) => {
//   const {subcategoryId} = ctx.query;
//
//   if (!subcategoryId) return next();
//
//   const products = await Product.find({subcategoryId}).populate('brand');
//
//   if (products.length === 0) ctx.throw(404, `No products in category '${subcategoryId}'`);
//
//   ctx.body = {products: products.map(mapProduct)};
// };

module.exports.productsList = async (ctx) => {
  let {page, limit, sort, subcategoryId, brand, rating, minPrice, maxPrice} = ctx.query;

  page = Number(page) || 1;
  limit = limit || 3;
  if (limit === 'all') limit = null;
  const skip = page * limit - limit;

  let order = 'asc';

  switch (sort) {
    case 'title':
      sort = 'slug';
      break;
    case 'newest':
      order = 'desc';
      sort = 'createdAt';
      break;
    case 'rating':
      order = 'desc';
      sort = 'rating.overall';
      break;
  }

  const params = {};
  if (brand) params.brand = {$in: brand.split(',').map(item => mongoose.Types.ObjectId(item))};
  if (subcategoryId) params.subcategoryId = {$in: subcategoryId.split(',')};
  if (rating) params['rating.overall'] = {$gte: rating, $lt: +rating + 1};
  if (minPrice && maxPrice) params.price = {$gte: +minPrice, $lte: +maxPrice};

  const products = await Product
    .find(params)
    .sort({[sort]: order})
    .skip(skip)
    .limit(limit)
    .populate('brand');

  if (!products.length) ctx.throw(404, 'No products for to the specified parameters');

  const totalCount = await Product.countDocuments(params);

  const minMaxPrice = await Product.aggregate([
    {$match: {}},
    {$group: {_id: null, min: {$min: '$price'}, max: {$max: '$price'}}},
  ]);

  ctx.body = {
    products: {
      entities: products.map(mapProduct),
      totalCount,
      minPrice: minMaxPrice[0].min,
      maxPrice: minMaxPrice[0].max
    }
  };
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

module.exports.updateProduct = async (ctx) => {
  const {
    brand, description, price, slug, subcategoryId, title, images, specification
  } = ctx.request.body;

  const product = await Product.findOneAndUpdate({slug}, {
    brand, description, price, subcategoryId, title, images, specification
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


