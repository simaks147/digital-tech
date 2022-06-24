const mongoose = require('mongoose');
const connection = require('../libs/connection');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  subcategoryId: {
    type: String,
    required: true
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Brand'
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
