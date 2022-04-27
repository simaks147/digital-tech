const uuid = require('uuid').v4;
const Session = require('../models/Session');

module.exports = async (user) => {
  const token = uuid();

  await Session.create({
    user,
    token,
    lastVisit: new Date(),
  });

  return token;
}
