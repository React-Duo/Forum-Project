import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '../config/firebase-config.js';

export const registerUser = async (email, password) => {
    const authObject = getAuth(app);
    await createUserWithEmailAndPassword(authObject, email, password);
}

