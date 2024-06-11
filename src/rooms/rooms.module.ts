import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RoomsGateway } from './rooms.gateway';
import { OnlineUsersService } from 'src/online-users/online-users.service';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, RoomsGateway, OnlineUsersService],
})
export class RoomsModule {}
