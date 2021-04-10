import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
  apiKey: 'AIzaSyDzQfedGmkml7WoElEBpg5e8oa49nHbEhI',
  authDomain: 'vuechat-3d20e.firebaseapp.com',
  databaseURL: 'https://vuechat-3d20e-default-rtdb.firebaseio.com',
  projectId: 'vuechat-3d20e',
  storageBucket: 'vuechat-3d20e.appspot.com',
  messagingSenderId: '557403290211',
  appId: '1:557403290211:web:0dda182cb222b28d151656'
};
// Initialize Firebase
const db = firebase.initializeApp(firebaseConfig);
export default db;
