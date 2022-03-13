// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAKGEh54VyOzRreR4Bo_jb5m7OuaRtPnIA',
  authDomain: 'three-musketeers-d20e8.firebaseapp.com',
  projectId: 'three-musketeers-d20e8',
  storageBucket: 'three-musketeers-d20e8.appspot.com',
  messagingSenderId: '431802646031',
  appId: '1:431802646031:web:0fae1fafe064d3d93b6d7a',
  measurementId: 'G-89089H4967',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
