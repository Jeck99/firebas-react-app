import "./Login-Button.css";
import { useContext } from "react";
import { FirebaseContext } from "../../../context/firebase-context";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

function LoginButton() {
  const { auth,user } = useContext(FirebaseContext);
  const googleLogin = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(googleProvider);
  };
  return (
    <>
    {user?.displayName}
      <button onClick={googleLogin}>
        <h1>Login-Button</h1>
      </button>
    </>
  );
}
export default LoginButton;
