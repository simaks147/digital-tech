const Category = require('../models/Category');
const {mapCategory} = require('../utils/mappers');

module.exports = async (ctx) => {
  const categories = await Category.find();
  ctx.body = {categories: categories.map(mapCategory)};
};
