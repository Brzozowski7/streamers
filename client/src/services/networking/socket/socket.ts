import io, { Socket } from 'socket.io-client';

const createNewSocketClient = (socketServerPath: string): Socket => {
  console.log(`Connecting websocket to: ${socketServerPath}/socket.io`);
  const socket = io(socketServerPath, {
    path: `/api/socket.io`,
    transports: ['websocket'],
    autoConnect: false,
    upgrade: false,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    rejectUnauthorized: false,
  });

  socket.on('connect', () => {
    console.log(`Socket client ${socket.id} connected to ${socketServerPath}`);
  });

  socket.on('connect_error', (e) => {
    console.log('Error connecting to socket:', e);
  });

  socket.on('error', (e) => {
    console.log('Error connecting to socket:', e);
  });

  return socket;
};

const socketUrl = process.env.REACT_APP_SOCKET_API_URL!;

export default createNewSocketClient(socketUrl);
