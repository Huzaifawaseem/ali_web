import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCQ-YjDMGbp9VBobLChf7mn4drcFIBkLEM",
  authDomain: "daraz-2d582.firebaseapp.com",
  databaseURL: "https://daraz-2d582-default-rtdb.firebaseio.com",
  projectId: "daraz-2d582",
  storageBucket: "daraz-2d582.firebasestorage.app",
  messagingSenderId: "536524211664",
  appId: "1:536524211664:web:cdb2c7a5801877b679e5d5"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);

export { app, database };