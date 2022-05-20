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

  await passport.authenticate(provider, {session: false}, async (err, user, info) => {
    if (err) throw err;

    if (!user) ctx.throw(400, info);

    ctx.body = await ctx.login(user);
  })(ctx, next);
};
