// const Session = require('../models/Session');

module.exports.mustBeAuthenticated = async (ctx, next) => {
  if (!ctx.user) ctx.throw(401, 'User not logged in');

  return next();
};

module.exports.mustBeAdmin = async (ctx, next) => {
  if (!ctx.user?.isAdmin) ctx.throw(403, 'User has no rights');

  return next();
};
