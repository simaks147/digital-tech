const Koa = require('koa');
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');
const path = require('path');
const serve = require('koa-static');
const login = require('./middleware/login');
const error = require('./middleware/error');
const history = require('./middleware/history');
const router = require('./router');

const app = new Koa();

app.use(cors());
app.use(bodyparser());
app.use(serve(path.join(__dirname, '../client/build')));
app.use(error);
app.use(login);
app.use(router.routes());
app.use(history);

module.exports = app;
