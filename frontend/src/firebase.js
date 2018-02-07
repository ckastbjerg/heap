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

const db = firebase.database();

let user;
let userData;

export const signIn = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .catch(error => console.log(error));
};

export const signOut = () => firebase.auth().signOut();

export default function init(onAuthChanged) {
  firebase.auth().onAuthStateChanged(profile => {
    userData = profile;
    if (profile) {
      user = db.ref(`users/${userData.uid}`);
      db.ref(`users/${userData.uid}`).update({
        displayName: userData.displayName.split(' ')[0],
        avatarUrl: userData.photoURL
      });
    }
    onAuthChanged(userData);
  });
}

const getFriendRequestData = ({ displayName }) => ({
  displayName,
  confirmed: false,
  inviteSentBy: userData.uid
});

export const addFriend = (store, { uid, displayName }) => {
  const friend = db.ref(`users/${uid}`);
  user.child(`friends/${uid}`).set(getFriendRequestData({ displayName }));
  friend.child(`friends/${userData.uid}`).set(getFriendRequestData(userData));
};

export const acceptFriendRequest = (store, uid) => {
  const friend = db.ref(`users/${uid}`);
  user.child(`friends/${uid}/confirmed`).set(true);
  friend.child(`friends/${userData.uid}/confirmed`).set(true);
};

export const declineFriendRequest = (store, uid) => {
  const friend = db.ref(`users/${uid}`);
  user.child(`friends/${uid}`).remove();
  friend.child(`friends/${userData.uid}`).remove();
};
