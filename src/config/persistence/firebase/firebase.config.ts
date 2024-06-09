import * as admin from 'firebase-admin';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const initializeFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert('config/firebase-key.json'), // Ruta a tu archivo JSON
  });
};
