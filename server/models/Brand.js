const mongoose = require('mongoose');
const connection = require('../libs/connection');

const brandSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

module.exports = connection.model('Brand', brandSchema);
