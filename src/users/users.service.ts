import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import * as admin from 'firebase-admin';
import { FIREBASE_ADMIN, USERS_FIREBASE_COLLECTION } from 'src/config/app/constants';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@Inject(FIREBASE_ADMIN) private readonly firebaseAdmin: typeof admin) {}


  async create(createUserDto: CreateUserDto): Promise<User> {
    const userfounded = await this.findUserByNick(createUserDto.nick);
    
    if(userfounded) {
      return userfounded;
    }

    const documentRef = await this.firebaseAdmin.firestore().collection(USERS_FIREBASE_COLLECTION)
          .add(({...createUserDto}));

    return await this.toUser(documentRef); 
  }

  async findAll(): Promise<User[]> {
    const resultSet = await this.firebaseAdmin.firestore().collection(USERS_FIREBASE_COLLECTION).get();
    return resultSet.docs.map((doc) => ({ id: doc.id, nick: doc.data().nick, roomsId: doc.data().roomsId }));
  }

  async findOne(id: string): Promise<User>  {
    const documentRef = this.firebaseAdmin.firestore().collection(USERS_FIREBASE_COLLECTION).doc(id);
    return this.toUser(documentRef);
  }

  async findUserByNick(nick: string): Promise<User> {
    const usersRef = this.firebaseAdmin.firestore().collection(USERS_FIREBASE_COLLECTION);
    const querySnapshot = await usersRef.where('nick', '==', nick).get();

    if (querySnapshot.empty) {
      return null;
    }

    return querySnapshot.docs.length > 0 ? ({ id: querySnapshot.docs[0].id, nick: querySnapshot.docs[0].data().nick}) : null;
  }

  private async toUser(documentRef: admin.firestore.DocumentReference): Promise<User> {
    const documentSnapshot = await documentRef.get();
    return documentSnapshot.exists ? ({ id: documentSnapshot.id, nick: documentSnapshot.data().nick, roomsId: documentSnapshot.data().roomsId}) : null;
  }

}
