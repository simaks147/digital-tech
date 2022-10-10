const Strategy = require('passport-github').Strategy;
const config = require('../../config');
const authenticate = require('./authenticate');

module.exports = new Strategy({
  clientID: config.providers.github.app_id,
  clientSecret: config.providers.github.app_secret,
  callbackURL: config.providers.github.callback_uri,
  session: false,
}, (accessToken, refreshToken, profile, done) => {
  authenticate(profile.emails?.[0].value, profile.username, done);
});
