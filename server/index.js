const app = require('./app');
const config = require('./config');
const socket = require('./libs/socket');

const server = app.listen(config.port, () => {
  console.log(`App is running on ${config.host}:${config.port}`)
});

socket(server);
