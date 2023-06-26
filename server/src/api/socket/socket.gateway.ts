import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketServerMessage } from 'libs/lib/src/socket/messages';
import { Server, Socket } from 'socket.io';

@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@WebSocketGateway({
  cors: {
    origin: '*',
  },
  path: '/api/socket.io',
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger(SocketGateway.name);
  private connectedSockets: Set<Socket> = new Set();

  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    this.logger.log(`New client connected: ${socket.id}`);

    this.connectedSockets.add(socket);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Client disconnected: ${socket.id}`);

    this.connectedSockets.delete(socket);
  }

  notifyVoteUpdate() {
    this.server.emit(SocketServerMessage.NewVote);
  }

  notifyNewStreamer() {
    this.server.emit(SocketServerMessage.NewStreamer);
  }
}
