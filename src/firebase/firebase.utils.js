import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// The project firebase configuration object
import { firebaseConfig } from './firebaseConfig';

export const createData = (path, dataArray, idName) => {
    const collectionRef = firestore.collection(path);

    dataArray.map(async data => {
        await collectionRef.doc(String(data[idName])).set({ ...data });
    });
};

export const getSubjects = async (collectionName, idPropertyName, userId) => {
    const collectionRef = await firestore.collection(collectionName);
    const subjectsArr = [];

    const querySnapshot = await collectionRef
        .where(idPropertyName, 'array-contains', userId)
        .get();

    if (!querySnapshot.empty) {
        querySnapshot.forEach(function (doc) {
            subjectsArr.push({ ...doc.data() });
        });
    }

    return subjectsArr;
};

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

export const markDataAsRegistered = async (pathName, keyName, id) => {
    const collectionRef = firestore.collection(pathName);
    const querySnapshot = await collectionRef.where(keyName, '==', id).get();

    // Now that we found our documentPath, we can make a change in the specific reference
    const docPath = querySnapshot.docs[0].ref.path;
    const documentRef = firestore.doc(docPath);

    documentRef.set(
        {
            registered: true,
        },
        { merge: true }
    );
};

export const getFakeData = async collectionPath => {
    const dataArr = [];
    const collectionRef = firestore.collection(collectionPath);

    const querySnapshot = await collectionRef
        .where('registered', '==', false)
        .get();

    if (!querySnapshot.empty) {
        querySnapshot.forEach(doc => {
            // registered is irrelevant ot the ui
            const { registered, ...data } = doc.data();

            dataArr.push({
                ...data,
                title: `${data.name} ${data.lastName}`,
                description: data.email,
            });
        });
    }

    return dataArr;
};

export const getUsers = async (collectionPath, userType, limit) => {
    const usersArr = [];
    const usersRef = firestore.collection(collectionPath);

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
