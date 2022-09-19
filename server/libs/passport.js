const {KoaPassport} = require('koa-passport');
const localStrategy = require('./strategies/local');
const vkontakteStrategy = require('./strategies/vkontakte');
const githubStrategy = require('./strategies/github');
const yandexStrategy = require('./strategies/yandex');

const passport = new KoaPassport();

passport.use(localStrategy);
passport.use(vkontakteStrategy);
passport.use(githubStrategy);
passport.use(yandexStrategy);

module.exports = passport;
