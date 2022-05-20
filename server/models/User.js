const mongoose = require('mongoose');
const crypto = require('crypto');
const uniqueValidator = require("mongoose-unique-validator");
const connection = require('../libs/connection');
const config = require('../config');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Email must not be empty',
    validate: [
      {
        validator(value) {
          return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
        },
        message: 'Invalid email',
      }
    ],
    unique: true,
  },
  displayName: {
    type: String,
    required: 'The user must have a username',
    // unique: 'This name already exists'
  },
  salt: {
    type: String
  },
  passwordHash: {
    type: String
  },
  verificationToken: {
    type: String,
    index: true
  }
}, {
  timestamps: true
});

userSchema.plugin(uniqueValidator, { message: 'User with this {PATH} already exists' });

const generatePassword = (salt, password) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      config.crypto.iterations,
      config.crypto.length,
      config.crypto.digest,
      (err, key) => {
        if (err) return reject(err);
        resolve(key.toString('hex'));
      });
  });
};

const generateSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(
      config.crypto.length,
      (err, buffer) => {
        if (err) return reject(err);
        resolve(buffer.toString('hex'));
      }
    );
  });
}

userSchema.methods.setPassword = async function (password) {
  this.salt = await generateSalt();
  this.passwordHash = await generatePassword(this.salt, password);
}

userSchema.methods.checkPassword = async function (password) {
  const hash = await generatePassword(this.salt, password);
  return hash === this.passwordHash
}

module.exports = connection.model('User', userSchema);
