const ImageKit = require('imagekit').default;
const config = require('../config');

module.exports = new ImageKit({
  urlEndpoint: config.images.urlEndpoint,
  publicKey: config.images.publicKey,
  privateKey: config.images.privateKey
});
