const Review = require('../models/Review');
const {mapReview} = require('../utils/mappers');

module.exports.reviewsByProduct = async (ctx) => {
  const {productId} = ctx.query;

  const reviews = await Review.find({productId});

  ctx.body = {reviews: reviews.map(mapReview)};
};

module.exports.createReview = async (ctx) => {
  const {productId, name, recommended, text, title, rating} = ctx.request.body;

  const review = await Review.create({
    productId,
    name,
    recommended,
    text,
    title,
    rating,
  });

  ctx.body = {review: mapReview(review)};
}
