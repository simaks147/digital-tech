const app = require('./server/app');
const config = require('./server/config');
const socket = require('./server/libs/socket');

const server = app.listen(config.port, () => {
  console.log(`App is running on ${config.host}:${config.port}`)
});

socket(server);
