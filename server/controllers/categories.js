const Category = require('../models/Category');

module.exports = async (ctx) => {
  const categories = await Category.find();
  ctx.body = {categories};
};
