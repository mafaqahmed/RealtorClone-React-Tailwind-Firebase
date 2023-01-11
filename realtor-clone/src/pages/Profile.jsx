import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [changedProfile, setChangedProfile] = useState();
  const [formData, setFormData] = useState({
    name: user.displayName,
    email: user.email,
  });
  const { name, email } = formData;

  const onLoggedOut = () => {
    auth.signOut();
    navigate("/");
  };

  const onClick = () => {
    setChangedProfile(!changedProfile);
    changedProfile && onSubmit();
  };

  const onChange = (e) => {
    setFormData({
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Your profile is updated");
    } catch (error) {
      toast.error("Could not update your profile");
    }
  };
  return (
    <>
      <section className="w-full md:w-[40%] flex justify-center items-center flex-col mx-auto">
        <h1 className="text-center my-6 text-3xl font-bold">My Profile</h1>
        <div className="w-full">
          <form>
            <input
              onChange={onChange}
              disabled={!changedProfile}
              type="text"
              id="name"
              value={name}
              className={`w-full rounded bg-white text-gray-500 text-xl border border-gray-300 transition ease-in-out duration-150 ${
                changedProfile &&
                "bg-red-300 focus:bg-red-300 border-gray-500 text-gray-700"
              }`}
            />
            <input
              onChange={onChange}
              disabled={!changedProfile}
              type="text"
              id="email"
              value={email}
              className={`w-full my-6 rounded bg-white text-gray-500 text-xl border border-gray-300 transition ease-in-out ${
                changedProfile &&
                "bg-red-300 focus:bg-red-300 border-gray-500 text-gray-700"
              }`}
            />
            <div className="flex justify-between whitespace-nowrap text-sm md:text-lg">
              <p>
                Do you want to change your name?{" "}
                <span
                  onClick={onClick}
                  className="ml-1 text-red-600 hover:text-red-800 transition ease-in-out cursor-pointer"
                >
                  {changedProfile ? "Apply changes" : "Edit"}
                </span>
              </p>
              <p
                onClick={onLoggedOut}
                className="ml-1 text-blue-600 hover:text-blue-800 transition ease-in-out cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
