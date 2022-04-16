const mongoose = require('mongoose');
const connection = require('../libs/connection');

const reviewSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  // date: {
  //   type: Date,
  // required: true
  // },
  name: {
    type: String,
    required: true
  },
  recommended: {
    type: Boolean,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
});

module.exports = connection.model('Review', reviewSchema);
