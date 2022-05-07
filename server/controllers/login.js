const passport = require('../libs/passport');

module.exports = async (ctx, next) => {
  await passport.authenticate('local', async (err, user, info) => {
    if (err) throw err;

    if (!user) {
      ctx.status = 400;
      ctx.body = {error: info};
      return;
    }

    ctx.body = await ctx.login(user);
  })(ctx, next);
};
