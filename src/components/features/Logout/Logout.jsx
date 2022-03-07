import "./Logout.css";
import React from "react";
import { useContext } from "react";
import { FirebaseContext } from "../../../context/firebase-context";

function Logout() {
  const { auth } = useContext(FirebaseContext);
  return (
    <button onClick={() => auth.signOut()}>
      <h1>Logout</h1>
    </button>
  );
}

export default Logout;
