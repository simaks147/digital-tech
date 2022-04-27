const Koa = require('koa');
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');
const login = require('./middleware/login');
const error = require('./middleware/error');
const router = require('./router');

const app = new Koa();

app.use(cors());
app.use(bodyparser());
app.use(error);
app.use(login);
app.use(router.routes());

module.exports = app;
