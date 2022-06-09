const mongoose = require('mongoose');
const connection = require('../libs/connection');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // products: {
  //   type: [
  //     {
  //       item: {
  //         type: mongoose.Schema.Types.ObjectId,
  //         required: true,
  //         ref: 'Product'
  //       },
  //       count: {
  //         type: Number,
  //         required: true
  //       }
  //     }
  //   ],
  //   required: true
  // },
  products: {
    type: {},
    required: true
  },
  phone: {
    type: String,
    required: true,
    validate: [
      {
        validator(value) {
          return /\+?\d{6,14}/.test(value);
        },
        message: 'Invalid phone'
      }
    ]
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = connection.model('Order', orderSchema);
