import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Slider from "../components/Slider";
import Spinner from "../components/Spinner";
import { db } from "../firebase";

export default function Home() {
  const [offerlistings, setOfferListings] = useState(null);
  const [rentlistings, setRentListings] = useState(null);
  const [salelistings, setSaleListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListing() {
      const listingsRef = collection(db, "listings");
      const q = query(
        listingsRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const listing = [];
      querySnap.forEach((doc) => {
        return listing.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setOfferListings(listing);
      setLoading(false);
    }
    fetchListing();
  }, []);

  useEffect(() => {
    async function fetchRentListing() {
      const listingsRef = collection(db, "listings");
      const q = query(
        listingsRef,
        where("type", "==", "rent"),
        orderBy("timestamp", "desc"),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const listing = [];
      querySnap.forEach((doc) => {
        return listing.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setRentListings(listing);
      setLoading(false);
    }
    fetchRentListing();
  }, []);

  useEffect(() => {
    async function fetchSaleListing() {
      const listingsRef = collection(db, "listings");
      const q = query(
        listingsRef,
        where("type", "==", "sell"),
        orderBy("timestamp", "desc"),
        limit(4)
      );
      const querySnap = await getDocs(q);
      
      const listing = [];
      querySnap.forEach((doc) => {
        return listing.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setSaleListings(listing);
      setLoading(false);
    }
    fetchSaleListing();
  }, []);

  if (loading) return <Spinner />;
  return (
    <>
      <Slider />
      <div className="px-3 max-w-6xl mx-auto">
        {offerlistings && (
          <>
            <p className="font-semibold text-2xl mt-4 mx-2">Recent Offers</p>
            <Link to='/offers'>
            <p className="mx-2 text-blue-800">Show more offers</p>
            </Link>
            <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {offerlistings.map((listing) => (
                <ListingItem
                  id={listing.id}
                  listing={listing.data}
                  key={listing.id}
                />
              ))}
            </ul>
          </>
        )}

        {rentlistings && (
          <>
            <p className="font-semibold text-2xl mt-4 mx-2">Places for rent</p>
            <Link to='/category/rent'>
            <p className="mx-2 text-blue-800">Show more places for rent</p>
            </Link>
            <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {rentlistings.map((listing) => (
                <ListingItem
                  id={listing.id}
                  listing={listing.data}
                  key={listing.id}
                />
              ))}
            </ul>
          </>
        )}

        {salelistings && (
          <>
            <p className="font-semibold text-2xl mt-4 mx-2">Places for sale</p>
            <Link to='/category/sell'>
            <p className="mx-2 text-blue-800">Show more places for sale</p>
            </Link>
            <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {salelistings.map((listing) => (
                <ListingItem
                  id={listing.id}
                  listing={listing.data}
                  key={listing.id}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
