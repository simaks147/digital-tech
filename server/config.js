require('dotenv').config();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '127.0.0.1';
// const DOMAIN = process.env.DOMAIN || `http://${HOST}${PORT !== 80 ? ':' + PORT : ''}`;

module.exports = {
  port: PORT,
  host: HOST,
  // domain: DOMAIN,
  mongodb: {
    uri: process.env.MONGODB_URI
  },
  crypto: {
    iterations: process.env.NODE_ENV !== 'production' ? 1 : 10000,
    length: 128,
    digest: 'sha512'
  }
}
