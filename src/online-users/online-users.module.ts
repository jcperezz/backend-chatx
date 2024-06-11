import { Module } from '@nestjs/common';
import { OnlineUsersService } from './online-users.service';
import { OnlineUsersController } from './online-users.controller';

@Module({
  controllers: [OnlineUsersController],
  providers: [OnlineUsersService],
})
export class OnlineUsersModule {}
