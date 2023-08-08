import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private server: Server) {}

  handleConnection(client: Socket) {
    // console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    // console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() roomName: string, @ConnectedSocket() client: Socket) {
    console.log(roomName)
    client.join(roomName);
    console.log(`Client ${client.id} joined room ${roomName}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@MessageBody() roomName: string, @ConnectedSocket() client: Socket) {
    client.leave(roomName);
    console.log(`Client ${client.id} left room ${roomName}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {    
     const roomName = data.roomName
    console.log(1);
    client.to(roomName).emit('message', [data.userName, data.message]); 
    // client.broadcast.emit('message', [client.id, data]); 
    console.log(2);
  }
}
