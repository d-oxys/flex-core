// utils/firebaseConfig.ts
import { initializeApp, FirebaseApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCOvRYVAS_COBsEZVfbDVQe2HCES3BJaGc',
  authDomain: 'flex-core-bf9f0.firebaseapp.com',
  projectId: 'flex-core-bf9f0',
  storageBucket: 'flex-core-bf9f0.appspot.com',
  messagingSenderId: '688785917257',
  appId: '1:688785917257:web:1e41eda44a45e7547f8698',
  measurementId: 'G-JW00PWNCG5',
};

let app: FirebaseApp;
let db: Firestore;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} else {
  app = getApp();
  db = getFirestore(app);
}

export { db };
