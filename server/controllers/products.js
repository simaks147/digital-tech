const Product = require('../models/Product');
const {mapProduct} = require('../utils/mappers');

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
  // const products = await Product.find().sort().populate('brand');

  let {page, limit, sort, subcategoryId} = ctx.query;

  page = Number(page) || 1;
  limit = limit || 3;
  if (limit === 'all') limit = null;
  const skip = page * limit - limit;

  let order = 'asc';
  if (sort === 'title') sort = 'slug';
  if (sort === 'newest') {
    order = 'desc';
    sort = 'createdAt';
  }

  const params = {};
  if (subcategoryId) params.subcategoryId = subcategoryId;

  // const products = await Product
  //   .find({brand: ['62b58731fdf8f32a56234361', '62b58449fdf8f32a56234350']})
  //   .sort({price: 'desc'})
  //   .skip(3)
  //   .limit(3)
  //   .populate('brand');

  const products = await Product
    .find({...params})
    .sort({[sort]: order})
    .skip(skip)
    .limit(limit)
    .populate('brand');

  if (!products.length) ctx.throw(404, 'No products for to the specified parameters');

  const totalCount = await Product.countDocuments({...params});

  ctx.body = {
    products: {
      entities: products.map(mapProduct),
      totalCount
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


