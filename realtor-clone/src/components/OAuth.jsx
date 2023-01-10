import React from "react";
import {FcGoogle} from "react-icons/fc";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

export default function OAuth() {
  const onClickGoogle = async() => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if(!docSnap.exists()){
        await setDoc(docRef,{
          name: user.displayName,
          email:user.email,
          timestamp: serverTimestamp()
        })
      }
      toast.success("Signed up successfully")
    } catch (error) {
      toast.error("Failed to sign up")
    }
  }

  return (
    <button
      className="flex justify-center items-center w-full py-3 text-white bg-red-700 shadow-md rounded text-sm font-medium uppercase hover:bg-red-800 hover:shadow-lg active:bg-red-900 transition duration-150 ease-in-out"
      type="button" onClick={onClickGoogle}
    >
        <FcGoogle className="mr-2 bg-white rounded-full text-xl"/>
      continue with google
    </button>
  );
}