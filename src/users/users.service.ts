import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import * as admin from 'firebase-admin';
import { FIREBASE_ADMIN, USERS_FIREBASE_COLETION } from 'src/config/app/constants';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@Inject(FIREBASE_ADMIN) private readonly firebaseAdmin: typeof admin) {}


  async create(createUserDto: CreateUserDto): Promise<User> {
    const documentRef = await this.firebaseAdmin.firestore().collection(USERS_FIREBASE_COLETION)
          .add(({...createUserDto, online: true}));

    return this.toUser(documentRef); 
  }

  async findAll(): Promise<User[]> {
    const resultSet = await this.firebaseAdmin.firestore().collection(USERS_FIREBASE_COLETION).get();
    return resultSet.docs.map((doc) => ({ id: doc.id, nick: doc.data().nick }));
  }

  async findOne(id: string): Promise<User>  {
    const documentRef = this.firebaseAdmin.firestore().collection(USERS_FIREBASE_COLETION).doc(id);
    return this.toUser(documentRef);
  }

  private async toUser(documentRef: admin.firestore.DocumentReference): Promise<User> {
    const documentSnapshot = await documentRef.get();
    return documentSnapshot.exists ? ({ id: documentSnapshot.id, nick: documentSnapshot.data().nick}) : null;
  }

}
