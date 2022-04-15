const Review = require('../models/Review');

module.exports = async (ctx) => {
  const {productId} = ctx.query;

  const reviews = await Review.find({productId});

  ctx.body = {reviews};
}
