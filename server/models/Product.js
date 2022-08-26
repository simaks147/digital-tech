const mongoose = require('mongoose');
const connection = require('../libs/connection');
const uniqueValidator = require("mongoose-unique-validator");
const Double = require('@mongoosejs/double');

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
      _id: false,
      title: String,
      description: String
    }]
  },
  rating: {
    type: {
      _id: false,
      overall: {
        type: Double,
        required: true
      },
      reviewsCount: {
        type: Number,
        required: true
      }
    },
    default: {
      overall: 0,
      reviewsCount: 0
    }
  },
  sale: {
    type: {
      _id: false,
      discountPercent: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      title: {
        type: String
      },
      subtitle: {
        type: String
      },
      bgColor: {
        type: String
      },
      images: {
        type: [String],
      },
    }
  }
}, {
  timestamps: true
});

productSchema.plugin(uniqueValidator, {message: 'Product with this {PATH} already exists'});

module.exports = connection.model('Product', productSchema);
