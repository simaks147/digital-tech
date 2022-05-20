const passport = require('../libs/passport');

module.exports = async (ctx, next) => {
  await passport.authenticate('local', async (err, user, info) => {
    if (err) throw err;

    if (!user) ctx.throw(400, info);

    ctx.body = await ctx.login(user);
  })(ctx, next);
};
