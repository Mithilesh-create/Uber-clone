import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'; 
const firebaseConfig = {
  apiKey: "AIzaSyCvcskopnkIj6j9HdhK1WLR7OHcxbrhgLg",
  authDomain: "uber-clone-e9a70.firebaseapp.com",
  projectId: "uber-clone-e9a70",
  storageBucket: "uber-clone-e9a70.appspot.com",
  messagingSenderId: "736545551621",
  appId: "1:736545551621:web:4cd7b1e23ac5cd91fe336c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);