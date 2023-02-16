import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react"
import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";
import { db } from "../firebase";

export default function Offers() {
  const [lastListing, setLastListing] = useState(null);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(
        listingsRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        limit(8)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchListings();
  }, []);

  const onFetchMoreData = async () => {
    const listingsRef = collection(db, "listings");
    const q = query(
      listingsRef,
      where("offer", "==", true),
      orderBy("timestamp", "desc"),
      startAfter(lastListing),
      limit(4)
    );
    const querySnap = await getDocs(q);
    const lastVisible = querySnap.docs[querySnap.docs.length - 1];
    setLastListing(lastVisible);
    const listings = [];
    querySnap.forEach((doc) => {
      return listings.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    setListings((prevState) => [...prevState, ...listings]);
  };

  if (loading) return <Spinner />;
  return (
    <>
      <div className="px-3 max-w-6xl mx-auto ">
        <p className="my-5 font-semibold text-4xl text-center">
          Offers
        </p>
        {listings && (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {listings.map((listing) => (
              <ListingItem
                id={listing.id}
                listing={listing.data}
                key={listing.id}
              />
            ))}
          </ul>
        )}
        {lastListing && (
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded shadow my-10"
            onClick={onFetchMoreData}
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
}
