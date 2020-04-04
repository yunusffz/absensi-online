import * as firebase from 'firebase';
import firestore from 'firebase/firestore'


const config = {
  apiKey: "AIzaSyAP-2yCrDaUXR7TzDJPxjWD-HZGfuA1HPk",
  authDomain: "absensi-online-stmik.firebaseapp.com",
  databaseURL: "https://absensi-online-stmik.firebaseio.com/",
  projectId: "absensi-online-stmik",
  storageBucket: "gs://absensi-online-stmik.appspot.com",
  messagingSenderId: "729003607467"
};
firebase.initializeApp(config);

export default firebase;