const Strategy = require('passport-vkontakte').Strategy;
const config = require('../../config');

module.exports = new Strategy({
  clientID: config.providers.vkontakte.app_id,
  clientSecret: config.providers.vkontakte.app_secret,
  callbackURL: config.providers.vkontakte.callback_uri,
  apiVersion: '5.110',
  scope: ['user:email'],
  session: false,
}, (accessToken, refreshToken, params, profile, done) => {
  try {
    done(null, false, 'Стратегия VK еще не подключена')
  }
  catch (err) {
    done(err);
  }
});
