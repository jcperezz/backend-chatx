import { WEBSOCKET_API_PORT, WEBSOCKET_NEW_MESSAGE, WEBSOCKET_NEW_ONLINE_USER, WEBSOCKET_OFFLINE_USER, WEBSOCKET_ONLINE_USER, WEBSOCKET_SEND_MESSAGE } from 'src/config/app/constants';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';
import { SendMessageDto } from './dto/send-message.dto';
import { SendOnlineUser } from './dto/send-online-user.dto';
import { OnlineUsersService } from 'src/online-users/online-users.service';
import { NewMessageDto } from './dto/new-message.dto';
import { randomUUID } from 'crypto';

@WebSocketGateway(WEBSOCKET_API_PORT, { namespace: '/room', cors: { origin: '*' } })
export class RoomsGateway {

  @WebSocketServer() server: Server;
  private clients: Map<string, Socket> = new Map();

  constructor(private readonly roomsService: RoomsService, private readonly onlineUsersService: OnlineUsersService) { }

  @SubscribeMessage(WEBSOCKET_SEND_MESSAGE)
  async handleMessage(client: any, payload: SendMessageDto): Promise<void> {
    console.log('mensaje', payload);
    this.sendPrivateMessage(payload.toConnectionId, ({...payload, date: Date.now(), id: randomUUID()}));
    this.sendPrivateMessage(client.id, ({...payload, date: Date.now(), id: randomUUID()}));
  }

  @SubscribeMessage(WEBSOCKET_ONLINE_USER)
  async handleOnlineUser(client: any, payload: SendOnlineUser): Promise<void> {
    if (!payload.id || this.clients.has(payload.id)) {
      return;
    }

    console.log(WEBSOCKET_ONLINE_USER, payload);
    await this.onlineUsersService.create(({ userId: payload.id, nick: payload.nick, connectionId: client.id }));

    this.server.emit(WEBSOCKET_NEW_ONLINE_USER, ({ userId: payload.id, nick: payload.nick, connectionId: client.id }));
    (await this.onlineUsersService.findAll()).forEach(onlineUser => client.emit(WEBSOCKET_NEW_ONLINE_USER, onlineUser));
  }

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    // Almacenar el socket en el mapa de clientes
    this.clients.set(client.id, client);
  }

  async handleDisconnect(client: Socket) {
    this.server.emit(WEBSOCKET_OFFLINE_USER, client.id);
    console.log(`Client disconnected: ${client.id}`);
    // Eliminar el socket del mapa de clientes
    this.clients.delete(client.id);
    await this.onlineUsersService.removeByConnectionId(client.id);
  }

  private sendPrivateMessage(clientId: string, payload: NewMessageDto) {
    const client = this.clients.get(clientId);
    if (client) {
      client.emit(WEBSOCKET_NEW_MESSAGE, payload);
    } else {
      console.error(`Client with ID ${clientId} not found`);
    }
  }

}
