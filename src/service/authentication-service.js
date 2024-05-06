import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '../config/firebase-config.js';

export const registerUser = async (emailAddress, password) => {
    try {
        const authObject = getAuth(app);
        const userCredentials = await createUserWithEmailAndPassword(authObject, emailAddress, password);
        return userCredentials;
    } catch (error) {
        return error.message;
    }
}

export const signInUser = async (emailAddress, password) => {
    try {
        const authObject = getAuth(app);
        const userCredentials = await signInWithEmailAndPassword(authObject, emailAddress, password);
        return userCredentials;
    } catch (error) {
        return error.message;
    }
}

export const signOutUser = async () => {
    try {
        const authObject = getAuth(app);
        await signOut(authObject);
    } catch (error) {
        return error.message;
    }
}
