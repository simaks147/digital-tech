const Strategy = require('passport-yandex').Strategy;
const config = require('../../config');
const authenticate = require('./authenticate');

module.exports = new Strategy({
  clientID: config.providers.yandex.app_id,
  clientSecret: config.providers.yandex.app_secret,
  callbackURL: config.providers.yandex.callback_uri,
  session: false,
}, (accessToken, refreshToken, profile, done) => {
  authenticate(profile.emails[0].value, profile.username, done);
});
