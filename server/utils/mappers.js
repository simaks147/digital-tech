module.exports.mapProduct = (product) => {
  const {_id, ...rest} = product.toJSON();

  return rest;
};

module.exports.mapCategory = (category) => {
  const {_id, ...rest} = category.toJSON();

  return rest;
};

module.exports.mapReview = (review) => ({
  id: review.id,
  productId: review.productId,
  title: review.title,
  name: review.name,
  text: review.text,
  recommended: review.recommended,
  rating: review.rating,
  date: review.createdAt
});
