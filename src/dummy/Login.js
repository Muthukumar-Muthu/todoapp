import { useState } from "react";
import { app } from "./firebase-config";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
export default function Login({ setUserObject }) {
  async function clickHandler() {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(getAuth(), provider);
      setUserObject(getAuth().currentUser);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="login">
      <div className="button" onClick={clickHandler}>
        Login
      </div>
    </div>
  );
}
