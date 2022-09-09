const {KoaPassport} = require('koa-passport');
const localStrategy = require('./strategies/local');
const vkontakteStrategy = require('./strategies/vkontakte');
const githubStrategy = require('./strategies/github');

const passport = new KoaPassport();

passport.use(localStrategy);
passport.use(vkontakteStrategy);
passport.use(githubStrategy);

module.exports = passport;
