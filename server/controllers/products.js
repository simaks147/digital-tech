const Product = require('../models/Product');

module.exports.productsBySubcategory = async (ctx) => {
  const {subcategoryId} = ctx.query;

  // const result = products.filter(product => product.subcategoryId === subcategoryId);

  const products = await Product.find({subcategoryId});

  ctx.body = {products};
}
