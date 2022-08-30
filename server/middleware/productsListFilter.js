const mongoose = require("mongoose");

module.exports = (ctx, next) => {
  let {page, limit, sort, subcategoryId, brand, rating, minPrice, maxPrice} = ctx.query;

  page = Number(page) || 1;
  limit = limit || 3;
  if (limit === 'all') limit = null;
  const skip = page * limit - limit;

  let order = 'asc';

  switch (sort) {
    case 'title':
      sort = 'title';
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

  const filters = {};

  if (brand) filters.brand = {$in: brand.split(',').map(item => mongoose.Types.ObjectId(item))};

  if (subcategoryId) filters.subcategoryId = {$in: subcategoryId.split(',')};

  if ( rating && !isNaN( rating) ) {
    const intRating = Math.floor(rating);
    filters['rating.overall'] = {$gte: intRating, $lt: intRating + 1};
  }

  if (minPrice || maxPrice) {
    filters['sale.price'] = {};

    if (minPrice && !isNaN(minPrice)) {
      filters['sale.price'].$gte = Math.floor(minPrice);
    }

    if (maxPrice && !isNaN(maxPrice)) {
      filters['sale.price'].$lte = Math.floor(maxPrice);
    }
  }

  ctx.queryParams = {
    filters, sort, order, skip, limit, subcategoryId
  };

  return next();
};
