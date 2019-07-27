import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDyPoXY9nkXhbf8-n3jkXI4slUPb8Dnfj4",
    authDomain: "react-stduty.firebaseapp.com",
    databaseURL: "https://react-stduty.firebaseio.com",
    projectId: "react-stduty",
    storageBucket: "",
    messagingSenderId: "1092016831211",
    appId: "1:1092016831211:web:55e779480273e7b2"
  };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  
  if (!snapShot.exists) { 
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log(error.message);
    }
  }
  return userRef;
} 



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

