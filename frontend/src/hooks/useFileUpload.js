import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../utils/firebase";

const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [cvURL, setCVURL] = useState("");

  const uploadFile = (file, folderName) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const folder = `${folderName}/`;
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, folder + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      setIsLoading(true);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              reject(error);
              break;
            case "storage/canceled":
              reject(error);
              break;
            case "storage/unknown":
              reject(error);
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setCVURL(downloadURL);
              setIsFileUploaded(true);
              resolve(downloadURL);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
              reject(error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      );
    });
  };  

  return {
    isLoading,
    isFileUploaded,
    cvURL,
    uploadFile,
    setCVURL,
    setIsFileUploaded,
    setIsLoading,
  };
};

export default useFileUpload;
