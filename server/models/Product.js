const mongoose = require('mongoose');
const connection = require('../libs/connection');

const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  subTitle: {
    type: String
  },
  subcategoryId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  specification: {
    type: {}
  }
});

module.exports = connection.model('Product', productSchema);
