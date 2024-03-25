import { Server } from 'http';
import { Socket } from 'net';
import { NextApiRequest, NextApiResponse } from 'next';

const ioHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!res.socket?.server.io) {
    console.log('*First use, starting Socket.IO');
    const io = new Server(res.socket?.server);

    io.on('connection', (socket: Socket) => {
      console.log(`Socket ${socket.id} connected.`);

      socket.on('message', (message) => {
        io.emit('message', message);
      });

      socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected.`);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
