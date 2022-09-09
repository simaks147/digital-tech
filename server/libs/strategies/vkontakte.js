const Strategy = require('passport-vkontakte').Strategy;
const config = require('../../config');
const authenticate = require('./authenticate');

module.exports = new Strategy({
  clientID: config.providers.vkontakte.app_id,
  clientSecret: config.providers.vkontakte.app_secret,
  callbackURL: config.providers.vkontakte.callback_uri,
  apiVersion: '5.110',
  // scope: ['user:email'],
  session: false,
}, (accessToken, refreshToken, params, profile, done) => {
  // authenticate(params.email, profile.displayName, done);
  authenticate(profile.emails[0].value, profile.displayName, done);
});
