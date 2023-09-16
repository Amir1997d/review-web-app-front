import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDoRzZzgbpoi4HZOgZYsBNLp2jdYCb8QQQ",
  authDomain: "reviewer-img-cloud.firebaseapp.com",
  projectId: "reviewer-img-cloud",
  storageBucket: "reviewer-img-cloud.appspot.com",
  messagingSenderId: "661982903918",
  appId: "1:661982903918:web:65f8e033fefff9008d707f"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);