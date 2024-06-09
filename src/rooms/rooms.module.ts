import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RoomsGateway } from './rooms.gateway';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, RoomsGateway, UsersService],
})
export class RoomsModule {}
