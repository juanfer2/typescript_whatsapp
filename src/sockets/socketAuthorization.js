// Client
const io = require('socket.io-client');

const socket = io('http://localhost:3000', {
  transportOptions: {
    polling: {
      extraHeaders: {
        'Authorization': 'Bearer abc',
      },
    },
  },
});

socket.on('connect', () => {
  console.log('connected!');
  socket.emit('room', 'room1');
});

socket.on('message', data => {
  console.log(data);
});

// Backend
const server = require('http').createServer();
const io = require('socket.io')(server);

const isValidJwt = (header) => {
  const token = header.split(' ')[1];
  if (token === 'abc') {
    return true;
  } else {
    return false;
  }
};

// io.of('/test');
io.use((socket, next) => {
  const header = socket.handshake.headers['authorization'];
  console.log(header);
  if (isValidJwt(header)) {
    return next();
  }
  return next(new Error('authentication error'));
});
io.on('connection', (socket) => {
  socket.on('room', room => {
    // console.log(room);
    socket.join(room);
  });
});

setInterval(() => {
  io.sockets.to('room1').emit('message', 'what is going on, party people?');
}, 3000);

setInterval(() => {
  io.sockets.to('room2').emit('message', 'anyone in this room yet?');
}, 3000);

server.listen(3000);
