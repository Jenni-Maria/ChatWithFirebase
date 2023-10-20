import { initializeApp } from 'firebase/app'
import { orderBy, query, onSnapshot, querySnapshot, getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {

    apiKey: "AIzaSyDIBfHH6_LKs9d-BvYbyVFIIdnqkJf-yrI",
    authDomain: "chat-a1cde.firebaseapp.com",
    projectId: "chat-a1cde",
    storageBucket: "chat-a1cde.appspot.com",
    messagingSenderId: "223655680504",
    appId: "1:223655680504:web:c76154e7645d5aad391e0d"
  
  };
  
  initializeApp(firebaseConfig);

  const firestrore = getFirestore();

  const MESSAGES = 'messages'

  export {
    firestrore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    onSnapshot,
    querySnapshot,
    orderBy,
    MESSAGES
  };

  console.log("Firebase toimii")
