import { Global, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { initializeFirebase } from './firebase.config';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        initializeFirebase();
        return admin;
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}