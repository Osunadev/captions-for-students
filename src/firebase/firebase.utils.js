import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// The project firebase configuration object
import { firebaseConfig } from './firebaseConfig';

export const createUserProfileDocument = async (userAuth, aditionalData) => {
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { email } = userAuth;
        const createdAt = new Date();

        await userRef.set({
            email,
            createdAt,
            ...aditionalData,
        });

        return '¡Su usuario ha sido registrado exitosamente!';
    }
};

export const getUsers = async (userType, limit) => {
    const usersArr = [];
    const usersRef = firestore.collection('users');

    let querySnapshot;

    if (limit) {
        querySnapshot = await usersRef
            .where('type', '==', userType)
            .limit(limit)
            .get();
    } else {
        querySnapshot = await usersRef.where('type', '==', userType).get();
    }

    if (!querySnapshot.empty) {
        querySnapshot.forEach(function (doc) {
            usersArr.push({ uid: doc.id, ...doc.data() });
        });
    }

    return usersArr;
};

export const getUser = async uid => {
    const userRef = firestore.doc(`users/${uid}`);

    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
        throw new Error('Lo sentimos, código de usuario inválido.');
    }

    return userSnapshot.data();
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
