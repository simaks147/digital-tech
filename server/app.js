const Koa = require('koa');
const compress = require('koa-compress');
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');
const path = require('path');
const serve = require('koa-static');
const login = require('./middleware/login');
const error = require('./middleware/error');
const history = require('./middleware/history');
const router = require('./router');

const app = new Koa();

app.use(compress({
  filter (content_type) {
    return /text/i.test(content_type)
  },
  threshold: 2048
}));
app.use(cors());
app.use(bodyparser());
app.use(serve(path.join(__dirname, '../client/build')));
app.use(error);
app.use(login);
app.use(router.routes());
app.use(history);

module.exports = app;
