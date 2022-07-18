const mongoose = require('mongoose');
const connection = require('../libs/connection');
const uniqueValidator = require("mongoose-unique-validator");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true
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
  },
  specification: {
    type: [{
      title: String,
      description: String
    }]
  }
}, {
  timestamps: true
});

productSchema.plugin(uniqueValidator, {message: 'Product with this {PATH} already exists'});

module.exports = connection.model('Product', productSchema);
