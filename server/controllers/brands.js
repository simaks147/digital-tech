const Brand = require('../models/Brand');
const {mapBrand} = require("../utils/mappers");

module.exports = async (ctx) => {
  const brands = await Brand.find();

  ctx.body = {brands: brands.map(mapBrand)};
};


