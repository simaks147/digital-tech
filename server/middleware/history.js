// HTML5 history in browser
const fs = require('fs');
const path = require('path');

module.exports = async ctx => {
  if (ctx.url.startsWith('/api') || ctx.method !== 'GET') return;

  ctx.set('content-type', 'text/html');
  ctx.body = fs.readFileSync(path.join(__dirname, '../../client/build/index.html'));
};
