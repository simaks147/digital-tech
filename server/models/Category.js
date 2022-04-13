const mongoose = require('mongoose');
const connection = require('../libs/connection');

const categorySchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  subcategory: {
    type: [
      {
        title: {
          type: String,
          required: true,
        },
        slug: {
          type: String,
          required: true,
        },
      }
    ],
    required: true,
  }
});


module.exports = connection.model('Category', categorySchema);
