const Session = require('../models/Session');

module.exports.mustBeAuthenticated = async (ctx, next) => {
  if (!ctx.user) ctx.throw(401, 'User not logged in');

  return next();
};

module.exports.alreadyAuthenticated = async (ctx, next) => {
  const session = await Session.findOne({ip: ctx.request.ip});

  if (session) ctx.throw(400, 'The user is already logged in');

  return next();
};
