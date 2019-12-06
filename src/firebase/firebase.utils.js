import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { googleSignInStart } from '../redux/user/user.actions';

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

export const addCollectionAndDocument = async (collectionKey, objectsTooAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  objectsTooAdd.forEach( obj => {    
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);    
  });

 return await batch.commit();

}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const {title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });
  return transformedCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {})
}
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged (userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleSignInStart);

export default firebase;

