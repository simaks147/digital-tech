const Category = require('../models/Category');
const {mapCategory} = require('../utils/mappers');

module.exports = async (ctx) => {
  const categories = await Category
    .find()
    .collation({locale:'en', strength: 2})
    .sort({'title': 'asc'});

  ctx.body = {categories: categories.map(mapCategory)};
};
