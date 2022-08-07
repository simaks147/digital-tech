const Review = require('../models/Review');
const Product = require('../models/Product');
const {mapReview, mapCategory} = require('../utils/mappers');

module.exports.reviewsByProduct = async (ctx) => {
  const {id} = ctx.query;

  const reviews = await Review.find({productId: id}).sort({createdAt: 'desc'});

  ctx.body = {reviews: reviews.map(mapReview)};
};

module.exports.createReview = async (ctx) => {
  const {productId, recommended, name, text, title, rating} = ctx.request.body;

  const review = await Review.create({
    productId,
    name,
    recommended,
    text,
    title,
    rating,
  });

  const reviews = await Review.aggregate([
    {$match: {productId}},
    {$group: {_id: null, rating: {$avg: '$rating'}, count: {$sum: 1}}}
  ]);

  await Product.findOneAndUpdate({slug: productId}, {
    rating: {
      overall: Math.round(reviews[0].rating * 100) / 100,
      reviewsCount: reviews[0].count
    }
  });

  ctx.body = await new Promise(resolve => {
    setTimeout(() => {
      resolve({review: mapReview(review)});
    }, 2000);
  });
}
