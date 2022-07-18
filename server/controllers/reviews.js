const Review = require('../models/Review');
const Product = require('../models/Product');
const {mapReview} = require('../utils/mappers');

module.exports.reviewsByProduct = async (ctx) => {
  const {id} = ctx.query;

  const reviews = await Review.find({productId: id}).sort({createdAt: 'desc'});

  ctx.body = {reviews: reviews.map(mapReview)};
};

module.exports.createReview = async (ctx) => {
  const {productId, recommended, name, text, title, rating, overallRating, reviewsCount} = ctx.request.body;

  const review = await Review.create({
    productId,
    name,
    recommended,
    text,
    title,
    rating,
  });

  await  Product.findOneAndUpdate({slug: productId}, {
    rating: {overall: overallRating, reviewsCount}
  });

  ctx.body = {review: mapReview(review)};
}
