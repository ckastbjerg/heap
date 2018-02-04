import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyDq1qSJxZfeoJKU7L6OTs3IL27fD7I5d4Q',
  authDomain: 'heap-55c3a.firebaseapp.com',
  databaseURL: 'https://heap-55c3a.firebaseio.com',
  projectId: 'heap-55c3a',
  storageBucket: 'heap-55c3a.appspot.com',
  messagingSenderId: '565111563546'
});

const provider = new firebase.auth.GoogleAuthProvider();

export const signIn = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .catch(error => console.log(error));
};

export const signOut = () => firebase.auth().signOut();

export default function init(onAuthChanged) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const db = firebase.database();
      db.ref(`users/${user.uid}`).update({
        displayName: user.displayName.split(' ')[0],
        avatarUrl: user.photoURL
      });
    }
    onAuthChanged(user);
  });
}
