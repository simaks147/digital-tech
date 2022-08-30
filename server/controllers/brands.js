const Brand = require('../models/Brand');
const {mapBrand} = require("../utils/mappers");

module.exports = async (ctx) => {
  const brands = await Brand
    .find()
    .collation({locale:'en', strength: 2})
    .sort({'title': 'asc'});

  ctx.body = {brands: brands.map(mapBrand)};
};


