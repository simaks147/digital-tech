module.exports.mapProduct = (product) => {
  const {description, images, price, rating, slug, specification, subcategoryId, title, sale}
    = product;

  return {
    brand: this.mapBrand(product.brand), description, images, price, rating, slug, specification, subcategoryId, title, sale
  };
};

module.exports.mapBrand = (brand) => ({
  id: brand._id,
  title: brand.title
});

module.exports.mapCategory = (category) => ({
  img: category.img,
  title: category.title,
  slug: category.slug,
  subcategory: category.subcategory
});

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
