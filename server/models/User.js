const mongoose = require('mongoose');
const crypto = require('crypto');
const connection = require('../libs/connection');
const config = require('../config');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'E-mail must not be empty',
    validate: [
      {
        validator(value) {
          return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
        },
        message: 'Invalid email',
      }
    ],
    unique: 'This email already exists,'
  },
  displayName: {
    type: String,
    required: 'The user must have a username',
    unique: 'This name already exists'
  },
  salt: {
    type: String
  },
  passwordHash: {
    type: String
  }
}, {
  timestamps: true
});

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
