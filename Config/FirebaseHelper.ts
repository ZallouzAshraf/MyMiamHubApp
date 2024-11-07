import { getApp, getApps, initializeApp, FirebaseApp } from "firebase/app";
import {
  initializeAuth,
  // @ts-ignore
  getReactNativePersistence,
  Persistence,
  getAuth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

let firebaseapp: FirebaseApp | undefined;

export const getFirebaseApp = (): FirebaseApp => {
  if (firebaseapp) {
    return firebaseapp;
  }

  const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  const app: FirebaseApp =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

  const persistence: Persistence = getReactNativePersistence(AsyncStorage);

  initializeAuth(app, {
    persistence: persistence,
  });

  firebaseapp = app;
  return firebaseapp;
};

const firebaseApp = getFirebaseApp();
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
