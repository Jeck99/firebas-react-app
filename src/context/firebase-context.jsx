import { createContext,useState,useEffect } from "react";
import firebase from "firebase/compat/app";
import firebaseConfig from "../firebase.js";
import "firebase/compat/auth";
import {useAuthState} from "react-firebase-hooks/auth"; // ייבוא
firebase.initializeApp(firebaseConfig); // איתחול הקשר לפיירבייס
const firebaseAuth = firebase.auth();// יצירת אובייקט אימות פיירבייס
export const FirebaseContext = createContext(); // יצירת קונטקסט
const FirebaseProvider = ({children})=>{
    const [user] = useAuthState(firebaseAuth); // ייבוא של משתמש מפיירבייס
    const [auth,setAuth] = useState(null);
    useEffect(()=>{
        setAuth(firebaseAuth);
    },[]);
    return(
        <FirebaseContext.Provider value={{user,auth}}>
            {children}
        </FirebaseContext.Provider>
    )
}
export default FirebaseProvider;