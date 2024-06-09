import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { WEBSOCKET_NEW_MESSAGE, WEBSOCKET_OFFLINE_USER, WEBSOCKET_ONLINE_USER, WEBSOCKET_SEND_MESSAGE } from 'src/config/app/constants';
import { RoomsService } from './rooms.service';
import { RoomWithMessages } from './entities/room-with-messages.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { SendMessageDto } from './dto/send-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@WebSocketGateway(3001, { namespace: '/room', cors: { origin: '*' } })
export class RoomsGateway {

  @WebSocketServer() server: Server;

  constructor(private readonly roomsService: RoomsService, private readonly usersService: UsersService) { }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage(WEBSOCKET_SEND_MESSAGE)
  async handleMessage(client: any, payload: SendMessageDto): Promise<void> {
    console.log('mensaje', payload);
    this.roomsService.addMessage(payload.roomId, payload as CreateMessageDto);
    this.server.emit(WEBSOCKET_NEW_MESSAGE, ({ owner: payload.nick, content: payload.content }));
  }

  async handleConnection(client: Socket) {

    const nick = client.handshake.query.nick;
    const id = client.handshake.query.id as string;
    const user = await this.usersService.findOne(id);

    console.log(`Client connected: ${client.id} ${nick} ${id}`);

    if (user) {
      this.server.emit(WEBSOCKET_ONLINE_USER, user);
    }

  }

  handleDisconnect(client: Socket) {

    const nick = client.handshake.query.nick;
    const id = client.handshake.query.id as string;

    this.server.emit(WEBSOCKET_OFFLINE_USER, ({ id: id, nick: nick }));

    console.log(`Client disconnected: ${client.id}`);
  }

}
