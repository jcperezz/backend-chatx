import { Inject, Injectable } from '@nestjs/common';
import { CreateOnlineUserDto } from './dto/create-online-user.dto';

import * as admin from 'firebase-admin';
import { FIREBASE_ADMIN, ONLINE_USERS_FIREBASE_COLLECTION, USERS_FIREBASE_COLLECTION } from 'src/config/app/constants';
import { OnlineUser } from './entities/online-user.entity';

@Injectable()
export class OnlineUsersService {

  constructor(@Inject(FIREBASE_ADMIN) private readonly firebaseAdmin: typeof admin) {}

  async create(createOnlineUserDto: CreateOnlineUserDto): Promise<void> {
    const usersRef = this.firebaseAdmin.firestore().collection(ONLINE_USERS_FIREBASE_COLLECTION);
    const querySnapshot = await usersRef.where('userId', '==', createOnlineUserDto.userId).get();
    

    if (!querySnapshot.empty) {
      const batch = this.firebaseAdmin.firestore().batch();
      querySnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
  
      await batch.commit();
    }
    
    await this.firebaseAdmin.firestore().collection(ONLINE_USERS_FIREBASE_COLLECTION)
    .add(({ ...createOnlineUserDto }));

  }

  async findAll(): Promise<OnlineUser[]> {
    const resultSet = await this.firebaseAdmin.firestore().collection(ONLINE_USERS_FIREBASE_COLLECTION).get();

    return resultSet.docs.map((doc) => ({
      id: doc.id,
      userId: doc.data().userId,
      nick: doc.data().nick,
      connectionId: doc.data().connectionId,
    }));
  }


  async removeByConnectionId(connectionId: string): Promise<void> {
    const usersRef = this.firebaseAdmin.firestore().collection(ONLINE_USERS_FIREBASE_COLLECTION);
    
    const querySnapshot = await usersRef.where('connectionId', '==', connectionId).get();

    if (!querySnapshot.empty) {
      const batch = this.firebaseAdmin.firestore().batch();
      querySnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
  
      await batch.commit();
    }
  }

}
