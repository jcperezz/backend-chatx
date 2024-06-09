import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';

import * as admin from 'firebase-admin';
import { FIREBASE_ADMIN, ROOMS_FIREBASE_COLLECTION } from 'src/config/app/constants';
import { Room } from './entities/room.entity';
import { RoomWithMessages } from './entities/room-with-messages.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class RoomsService {

  constructor(@Inject(FIREBASE_ADMIN) private readonly firebaseAdmin: typeof admin) { }

  async create(createRoomDto: CreateRoomDto): Promise<RoomWithMessages> {
    const documentRef = await this.firebaseAdmin.firestore().collection(ROOMS_FIREBASE_COLLECTION)
      .add(({ ...createRoomDto }));

    return this.toRoom(documentRef);
  }

  async addParticipantToRoom(roomId: string, participantId: string): Promise<void> {
    const docRef = this.firebaseAdmin.firestore().doc(`${ROOMS_FIREBASE_COLLECTION}/${roomId}`);

    await docRef.update({
      participantsIds: admin.firestore.FieldValue.arrayUnion(participantId),
    });
  }

  async addMessage(roomId: string, message: CreateMessageDto): Promise<void> {
    const docRef = this.firebaseAdmin.firestore().doc(`${ROOMS_FIREBASE_COLLECTION}/${roomId}`);

    const messageEntity : Message = ({
      content: message.content,
      date: Date.now(),
      senderId: message.senderId,
      roomId: roomId
    });

    await docRef.update({
      messages: admin.firestore.FieldValue.arrayUnion(messageEntity),
    });
  }

  async findAll(): Promise<Room[]> {
    const resultSet = await this.firebaseAdmin.firestore().collection(ROOMS_FIREBASE_COLLECTION).get();
    return resultSet.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      adminId: doc.data().adminId,
      participantsIds: doc.data().participantsIds
    }));
  }

  async findOne(id: string): Promise<RoomWithMessages> {
    const documentRef = this.firebaseAdmin.firestore().collection(ROOMS_FIREBASE_COLLECTION).doc(id);
    return this.toRoom(documentRef);
  }

  private async toRoom(documentRef: admin.firestore.DocumentData): Promise<RoomWithMessages> {
    const documentSnapshot = await documentRef.get();
    return documentSnapshot.exists ? ({
      id: documentSnapshot.id,
      name: documentSnapshot.data().name,
      adminId: documentSnapshot.data().adminId,
      participantsIds: documentSnapshot.data().participantsIds,
      messages: documentSnapshot.data().messages
    }) : null;
  }
}
