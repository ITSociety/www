const io = require('socket.io');

const logger = msg => console.log('[SOCKET]', msg);

const numbers = [];
const sockets = [];

const emitAll = (type, payload) => {
  sockets.map(sck => sck.emit(type, payload));
};

const testNum = num => (
  (num.length === 6) &&
  ((/[0-9]{6}/g).test(num)) &&
  (parseInt(num, 10) > 600000) &&
  (!numbers.includes(num))
);

const conn = sck => {
  logger(`${sck.id} connected`);

  // update the list of websocket clients
  sockets.push(sck);
  logger(`${sockets.length} total sockets connected`);

  emitAll('numbers', numbers);


  // respond to pings
  sck.on('keepalive', () => logger(`${sck.id} pinged`));

  // add an event listener for a question
  // on a question, update the total list
  // and emit the question to all clients.
  sck.on('number', num => {
    if (num.substring(0, 2) === 'up') {
      num = num.split('up')[1];
    }

    if (testNum(num)) {
      numbers.push(num);
      emitAll('numbers', [num]);
    }
  });


  sck.on('disconnect', () => {
    const index = sockets.indexOf(sck);
    if (index !== -1) sockets.splice(index, 1);
    logger(`${sck.id} disconnected.`);
    logger(`${sockets.length} sockets remain`);
  });
};

exports.init = server => {
  // initialise the server
  const sock = io(server);
  // add event listeners
  sock.on('connection', conn);
};
