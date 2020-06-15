import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

// The project firebase configuration object
import { firebaseConfig } from './firebaseConfig';

export const createData = (path, dataArray, idName) => {
    const collectionRef = firestore.collection(path);

    dataArray.map(async data => {
        await collectionRef.doc(String(data[idName])).set({ ...data });
    });
};

export const getSubjectTranscriptions = async subjectId => {
    const snapshot = await database
        .ref(subjectId)
        .orderByChild('dateMillis')
        .once('value');
    const transcriptionsArr = [];

    if (snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
            transcriptionsArr.push(childSnapshot.val());
        });
    }

    return transcriptionsArr;
};

export const getUserSubjects = async (userType, userId) => {
    const collectionRef = firestore.collection('subjects');
    const subjectsArr = [];
    let querySnapshot;

    if (userType === 'student') {
        querySnapshot = await collectionRef
            .where('studentIds', 'array-contains', userId)
            .get();
    } else {
        querySnapshot = await collectionRef
            .where('teacherId', '==', userId)
            .get();
    }

    if (!querySnapshot.empty) {
        querySnapshot.forEach(function (doc) {
            subjectsArr.push({ ...doc.data() });
        });
    }

    return subjectsArr;
};

export const registerSubject = async subjectObj => {
    const collectionRef = firestore.collection('subjects');

    const querySnapshot = await collectionRef
        .where('subjectId', '==', subjectObj.subjectId)
        .get();

    try {
        if (!querySnapshot.empty) {
            const updatedStudentIds = querySnapshot.docs[0].data().studentIds;
            // Expanding the studentIds array with a new studentId
            updatedStudentIds.push(subjectObj.studentIds[0]);

            const docPath = querySnapshot.docs[0].ref.path;
            const documentRef = firestore.doc(docPath);

            documentRef.set(
                {
                    studentIds: updatedStudentIds,
                },
                { merge: true }
            );
        } else {
            // If the subject isn't registered yet in the subject collection
            await collectionRef.add(subjectObj);
        }

        return true; // Registered
    } catch (error) {
        return false; // Not registered
    }
};

export const checkIfTeacherIsRegistered = async teacherId => {
    const collectionRef = firestore.collection('users');

    const querySnapshot = await collectionRef
        .where('teacherId', '==', teacherId)
        .get();

    return !querySnapshot.empty;
};

export const checkRegisteredSubjects = async (subjectsObjArr, studentId) => {
    const collectionRef = firestore.collection('subjects');

    for (let i = 0; i < subjectsObjArr.length; i++) {
        const querySnapshot = await collectionRef
            .where('subjectId', '==', subjectsObjArr[i].subjectId)
            .get();

        let isSubjectRegistered = false;

        if (!querySnapshot.empty) {
            // It means that a subjects exists, that it's registered
            // Now we need to check if the studentId is present, so that means
            // that the student is registered in the class
            const subjectData = querySnapshot.docs[0].data();

            // If it has this property, that means that it has some students assigned to that subject
            if (subjectData.studentIds) {
                isSubjectRegistered = subjectData.studentIds.includes(
                    studentId
                );
            }
        }

        subjectsObjArr[i]['isRegistered'] = isSubjectRegistered;
    }
};

export const getSubjects = async (collectionName, idPropertyName, userId) => {
    const collectionRef = firestore.collection(collectionName);
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

export const getUsers = async userType => {
    const usersArr = [];
    const collectionRef = firestore.collection('users');

    const querySnapshot = await collectionRef
        .where('type', '==', userType)
        .get();

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
export const database = firebase.database();

export default firebase;
