
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyDMTQ2cRnTXkJhNepenb1BcG4s3Yp3jQTQ",
  authDomain: "goldilocks-png.firebaseapp.com",
  databaseURL: "https://goldilocks-png-default-rtdb.firebaseio.com",
  projectId: "goldilocks-png",
  storageBucket: "goldilocks-png.appspot.com",
  messagingSenderId: "725271590200",
  appId: "1:725271590200:web:03613b2352656163fa7dcd",
  measurementId: "G-D8R32TM94Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);



export {db, storage};
