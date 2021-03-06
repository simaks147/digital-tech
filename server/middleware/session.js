const Session = require('../models/Session');

module.exports = async (ctx, next) => {
  const header = ctx.request.headers['authorization'];
  if (!header) return next();

  const token = header.split(' ')[1];
  if (!token) return next();

  const session = await Session.findOne({token}).populate('user');
  if (!session) ctx.throw(401, 'Invalid authentication token');

  session.lastVisit = new Date();
  await session.save();

  ctx.user = session.user;
  return next();
};
