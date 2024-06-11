import { Module } from '@nestjs/common';
import { FirebaseModule } from './config/persistence/firebase/firebase.module';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { OnlineUsersModule } from './online-users/online-users.module';

@Module({
  imports: [FirebaseModule, UsersModule, RoomsModule, OnlineUsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
