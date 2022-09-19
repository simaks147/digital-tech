require('dotenv').config();

const APP_NAME = 'DigitalTech';
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '127.0.0.1';
const DOMAIN = process.env.DOMAIN || `http://${HOST}${PORT !== 80 ? ':' + PORT : ''}`;

module.exports = {
  app_name: APP_NAME,
  port: PORT,
  host: HOST,
  domain: DOMAIN,
  mongodb: {
    uri: process.env.MONGODB_URI
  },
  crypto: {
    iterations: process.env.NODE_ENV !== 'production' ? 1 : 10000,
    length: 128,
    digest: 'sha512'
  },
  providers: {
    vkontakte: {
      app_id: process.env.VKONTAKTE_APP_ID || 'vkontakte_app_id',
      app_secret: process.env.VKONTAKTE_APP_SECRET || 'vkontakte_app_secret',
      callback_uri: 'http://localhost:3000/oauth/vkontakte',
      options: {
        scope: ['email'],
      }
    },
    github: {
      app_id: process.env.GITHUB_APP_ID || 'github_app_id',
      app_secret: process.env.GITHUB_APP_SECRET || 'github_app_secret',
      callback_uri: 'http://localhost:3000/oauth/github',
      options: {
        scope: ['user:email'],
      }
    },
    yandex: {
      app_id: process.env.YANDEX_APP_ID || 'yandex_app_id',
      app_secret: process.env.YANDEX_APP_SECRET || 'yandex_app_secret',
      callback_uri: 'http://localhost:3000/oauth/yandex',
      options: {}
    }
  },
  mailer: {
    api_key: process.env.MAILGUN_API_KEY || '',
    domain: process.env.MAILGUN_DOMAIN || ''
  },
  images: {
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
  }
}
