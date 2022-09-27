const {Server} = require("socket.io");
const Session = require("../models/Session");

module.exports = (server) => {
  const io = new Server(server);

  io.use(async (socket, next) => {
    const header = socket.handshake.headers['authorization'];
    if (!header) return next();

    const token = header.split(' ')[1];
    if (!token) return next();

    const session = await Session.findOne({token}).populate('user');
    if (!session) return next();

    socket.user = session.user;
    next();
  });

  io.on('connection', socket => {
    socket.on('client_message', (msg) => {
      setTimeout(() => {
        socket.emit('server_message', {
          date: msg.date + 3000,
          user: 'admin',
          text: `Hello${socket.user ? ', ' + socket.user.displayName : ''}! Managers are not available at the moment`
        });
      }, 3000);
    });
  });
}
