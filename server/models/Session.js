const mongoose = require('mongoose');
const connection = require('../libs/connection');

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token : {
    type: String,
    required: true,
    unique: true
  },
  lastVisit: {
    type: Date,
    required: true
  },
  ip: {
    type: String,
    required: true
  }
});

sessionSchema.path('lastVisit').index({expires: '7d'});

module.exports = connection.model('Session', sessionSchema);
