const passport = require('../libs/passport');
const config = require('../config');

module.exports.oauth = async (ctx, next) => {
  const provider = ctx.params.provider;

  await passport.authenticate(
    provider,
    config.providers[provider].options
  )(ctx, next);

  ctx.status = 200;
  ctx.body = {status: 'ok', location: ctx.response.get('location')};
};

module.exports.oauthCallback = async (ctx, next) => {
  const provider = ctx.request.body.provider;

  await passport.authenticate(provider, (err, user, info) => {
    if (err) throw err;

    // if (!user) {
      ctx.status = 400;
      ctx.body = {error: info};
      // return;
    // }

    // ctx.body = user.displayName;
  })(ctx, next);
};
