const {KoaPassport} = require('koa-passport');
const localStrategy = require('./strategies/local');
const vkontakteStrategy = require('./strategies/vkontakte');

const passport = new KoaPassport();

passport.use(localStrategy);
passport.use(vkontakteStrategy);

module.exports = passport;
