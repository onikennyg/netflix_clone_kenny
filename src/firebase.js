// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAck5y1mI17N4-FiYBhgX9B3v17LkGZqiY",
  authDomain: "netflix-clone-project-cf66b.firebaseapp.com",
  projectId: "netflix-clone-project-cf66b",
  storageBucket: "netflix-clone-project-cf66b.appspot.com",
  messagingSenderId: "1043009314477",
  appId: "1:1043009314477:web:3c989b1f83e9f2d9367024"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
  try {
   const res = await createUserWithEmailAndPassword(auth, email, password);
   const user = res.user;
   await addDoc(collection(db, "user"), {
    uid: user.uid,
    name,
    authProvider: "local",
    email,
   })
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email, password)=>{
  try {
     await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = ()=>{
  signOut(auth);
}

export {auth, db, login, signup, logout};