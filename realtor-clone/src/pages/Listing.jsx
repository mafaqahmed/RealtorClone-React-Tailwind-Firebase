import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

import Spinner from "../components/Spinner";



export default function Listing() {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      // console.log(docSnap.data());
      setListing({ ...docSnap.data() });
      setLoading(false);
    };
    fetchData();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  listing && listing.imgUrls.map((img) => console.log(img));

  return (
    <>
      {listing && listing.imgUrls.map((url, index) => (
          <div key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px] border border-black"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        ))}
    </>
  );
}