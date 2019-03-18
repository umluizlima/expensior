import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  projectId: 'expensior-app',
  databaseURL: 'https://expensior-app.firebaseio.com',
};
firebase.initializeApp(config);

export const db = firebase.firestore();
