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

        try {
            await userRef.set({
                email,
                createdAt,
                ...aditionalData,
            });

            return '¡Su usuario ha sido registrado exitosamente!';
        } catch (error) {
            // If we couln't register the user info into the firestore, we delete the user
            await userAuth.delete();

            return 'Lo sentimos, no pudimos registrar al usuario.';
        }
    }
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
