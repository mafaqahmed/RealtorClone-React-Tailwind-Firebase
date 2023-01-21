import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Spinner from "./Spinner";

export default function Contact({ listing }) {
    const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUserData = async () => {
        setLoading(true)
      const docRef = doc(db, "users", listing.userRef);
      const docSnap = await getDoc(docRef);
      setUserData(docSnap.data());
      setLoading(false)
    };
    getUserData();
  }, [listing.userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  if(loading){
    return <Spinner />
  }

  if (userData) {
    return (
      <>
        <p className="">
          Contact {userData.name.toLowerCase()} for {listing.name.toLowerCase()}
        </p>
        <textarea
          className="w-full mt-2 border-gray-300 active:border-gray-400 focus:border-gray-400 hover:border-gray-400"
          id="message"
          value={message}
          onChange={onChange}
          placeholder="Type your message"
        />
        <a href={`mailto:${userData.email}?subject=${listing.name} mailto!&body=${message}`}>
              <button
                className="mt-5 w-full text-center text-white font-semibold bg-blue-600 py-2 text-lg rounded shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-800 focus:shadow-xl"
              >
                Send Message
              </button>
              </a>
        {/* <a
          href={`mailto:${userData.email}?subject=${listing.name}&body=${message}`}
          className="mt-5 w-full text-center text-white font-semibold bg-blue-600 py-2 text-lg rounded shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-800 focus:shadow-xl"
        >
          Send Message
        </a> */}
      </>
    );
  }
}
