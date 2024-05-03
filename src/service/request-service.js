import database from '../config/firebase-config';
import { ref, push, get, set, update, query, equalTo, orderByChild, orderByKey, goOnline, goOffline } from "firebase/database";

const getUsers = async () => {
    goOnline(database);
    try {
        const snapshot = await get(ref(database, 'users'));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            throw new Error('Data not found!');
        }
    } catch (error) {
        return error.message;
    } finally {
        goOffline(database);
    }
}

const result = await getUsers();
console.log(result);




