const {KoaPassport} = require('koa-passport');
const localStrategy = require('./strategies/local');

const passport = new KoaPassport();

passport.use(localStrategy);

module.exports = passport;
