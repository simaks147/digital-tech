const Product = require('../models/Product');
const {mapProduct} = require('../utils/mappers');

module.exports.productsList = async (ctx) => {
  const {filters, sort, order, skip, limit, subcategoryId} = ctx.queryParams;

  const products = await Product
    .find(filters)
    .collation({locale:'en', strength: 2})
    .sort({[sort]: order})
    .skip(skip)
    .limit(limit)
    .populate('brand');

  const totalCount = await Product.countDocuments(filters);

  const minMaxPrice = await Product.aggregate([
    {$match: subcategoryId && totalCount ? {subcategoryId} : {}},
    {$group: {_id: null, min: {$min: '$sale.price'}, max: {$max: '$sale.price'}}},
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

  if (!product) ctx.throw(404, `No such product: '${slug}'`);

  ctx.body = {product: mapProduct(product)};
};

module.exports.createProduct = async (ctx) => {
  const body = ctx.request.body;

  const product = await Product.create({
    brand: body.brand,
    description: body.description,
    price: body.price,
    slug: body.slug,
    subcategoryId: body.subcategoryId,
    title: body.title,
    images: body.images,
    specification: body.specification,
    'sale.discountPercent': Number(body.discountPercent),
    'sale.price': body.price - Math.floor((body.price / 100) * body.discountPercent),
    'sale.title': body.saleTitle,
    'sale.subtitle': body.saleSubtitle,
    'sale.bgColor': body.saleBgColor,
    'sale.images': body.saleImages
  });

  await product.populate('brand');

  ctx.body = await new Promise(resolve => {
    setTimeout(() => {
      resolve({product: mapProduct(product)});
    }, 3000);
  });
};

module.exports.updateProduct = async (ctx) => {
  const body = ctx.request.body;

  const product = await Product.findOneAndUpdate({slug: body.slug},{
    brand: body.brand,
    description: body.description,
    price: body.price,
    slug: body.slug,
    subcategoryId: body.subcategoryId,
    title: body.title,
    images: body.images,
    specification: body.specification,
    'sale.discountPercent': Number(body.discountPercent),
    'sale.price': body.price - Math.floor((body.price / 100) * body.discountPercent),
    'sale.title': body.saleTitle,
    'sale.subtitle': body.saleSubtitle,
    'sale.bgColor': body.saleBgColor,
    'sale.images': body.saleImages
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

module.exports.recommendations = async (ctx) => {
  const recommendations = await Product.aggregate([
    {$match: {'rating.overall': {$gte: 4, $lt: 5}}},
    {$sample: {size: 3}}
  ]);

  ctx.body = {recommendations: recommendations.map(mapProduct)};
};

module.exports.relations = async (ctx) => {
  let {subcategoryId} = ctx.query;

  const relations = await Product.aggregate([
    {$match: {subcategoryId}},
    {$sample: {size: 2}}
  ]);

  ctx.body = {relations: relations.map(mapProduct)};
}

module.exports.sale = async (ctx) => {
  const sale = await Product.aggregate([
    {$match: {'sale.discountPercent': {$ne: 0}}},
    {$sample: {size: 3}}
  ]);

  ctx.body = {sale: sale.map(mapProduct)};
};


