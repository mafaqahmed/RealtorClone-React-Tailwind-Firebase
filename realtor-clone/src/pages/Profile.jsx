import { getAuth, updateProfile } from "firebase/auth";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import ListingItem from "../components/ListingItem";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(Array);
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

  useEffect(() => {
    async function fetchUserListings() {
      const q = query(
        collection(db, "listings"),
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      let listings = [];
      querySnapshot.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false)
    };
    fetchUserListings();
  }, [auth.currentUser.uid]);
  if(!loading){
    console.log(listings)
  }
  return (
    <>
      <section className="w-full px-5 lg:w-[40%] flex justify-center items-center flex-col mx-auto">
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
            <div className="flex justify-between whitespace-nowrap text-sm lg:text-lg mb-6">
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
          <button
            type="submit"
            className="w-full bg-blue-600 py-3 rounded uppercase text-white hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg"
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center"
            >
              <FcHome className="rounded-full text-3xl bg-red-200 border-2 p-1 mr-2" />
              sell or rent your home
            </Link>
          </button>
        </div>
      </section>
      <div className="mx-auto max-w-6xl mt-10 px-5">
        {!loading && listings.length>0 && (
          <div>
            <h1 className="font-semibold text-3xl text-center w-full mb-8">My Listings</h1>
            <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {listings.map((listing)=> (
              <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
            ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}