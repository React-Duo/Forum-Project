import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import{ storage } from "../config/firebase-config.js"


const storageRef = ref(storage);
const imagesRef = ref(storage, "users");

export const uploadFile = async (username, file, fileName) => {
    const imageNameRef = ref(storage, `users/${username}/${fileName}`);
    uploadBytes(imageNameRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };
  

export const getFile = async (username, fileName) => {
    const imageRef = ref(storage, `users/${username}/${fileName}`);
    getDownloadURL(imageRef).then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        // Or inserted into an <img> element
        console.log(url);
        return url;
      })
      .catch((error) => {
        console.error(error.message);
      });
}

//! use like that

  // const handleFileUpload = () => {
  //   uploadFile(assets.logo, "logo")
  //     .then(() => {
  //       console.log('File uploaded successfully');
  //     })
  //     .catch((error) => {
  //       console.error('Error uploading file:', error);
  //     });
  // };
  // handleFileUpload()