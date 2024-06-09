import { Module } from '@nestjs/common';
import { FirebaseModule } from './config/persistence/firebase/firebase.module';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [FirebaseModule, UsersModule, RoomsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
