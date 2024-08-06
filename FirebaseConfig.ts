import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDzt0aTA7E_SBSOS8JLiTNLJTV_JEYFYc",
  authDomain: "campuscompass-ec4b5.firebaseapp.com",
  projectId: "campuscompass-ec4b5",
  storageBucket: "campuscompass-ec4b5.appspot.com",
  messagingSenderId: "291723508441",
  appId: "1:291723508441:web:e12eea139b862620d0dcc8",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
