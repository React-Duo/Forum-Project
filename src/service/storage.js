import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import{ storage } from "../config/firebase-config.js"


export const uploadFile = async (username, file,) => {
    const imageNameRef = ref(storage, `users/${username}/photo`);
    await uploadBytes(imageNameRef, file)
  };
  

export const getFile = async (username,) => {
  try {
    const imageRef = ref(storage, `users/${username}/photo`);
    const url = await getDownloadURL(imageRef)
    return url;
  } catch (error) {
    console.log(error);
  }
  }
