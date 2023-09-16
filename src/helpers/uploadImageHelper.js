import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "./firebase";

export const uploadFile = (file, setProgress, setImgUrl) => {
    if(!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
        setProgress(prog);
    }, 
    (err) => console.log(err),
    () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then(url => {
            setImgUrl(url);
            console.log(url);
        });
    })
}

export function dropHandler(e, file, setFile) {
    console.log("File(s) dropped");
    e.preventDefault();
  
    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file") {
            setFile(item.getAsFile());
        }
      });
    } 
  }
  