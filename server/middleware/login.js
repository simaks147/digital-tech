const uuid = require('uuid').v4;
const Session = require('../models/Session');

module.exports = (ctx, next) => {
  ctx.login = async (user) => {
    const token = uuid();

    await Session.create({
      user,
      token,
      lastVisit: new Date(),
      ip: ctx.request.ip
    });

    return new Promise(resolve => {
      setTimeout(() => {
        resolve({token});
      }, 2000);
    });
  };

  return next();
};
