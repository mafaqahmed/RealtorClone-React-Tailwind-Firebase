import React, { useEffect, useState } from "react";
import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/bundle";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "./Spinner";

export default function Slider() {
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
        const querySnap = await getDocs(q);
        const listing = [];
        querySnap.forEach((doc) => {
          return listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listing);
        setLoading(false);
      } catch {}
    };
    fetchListing();
  });
  if (loading) {
    return <Spinner />;
  }
  if (listings.length === 0) {
    return <></>;
  }
  return (
    <>
      {listings && (
        <Swiper
          className="h-80"
          modules={[Navigation, Pagination, EffectFade, Autoplay]}
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          autoplay={{ delay: 3000 }}
          effect="fade"
        >
          {listings.map((listing) => (
            <SwiperSlide key={listing.id} className="w-full h-full">
              <div
                className="w-full h-full relative"
                style={{
                  backgroundImage: `url(${listing.data.imgUrls[0]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
              <p className="absolute p-2 m-2 bg-[#457B9D] text-white rounded-br-3xl">{listing.data.name}</p>
              <p className="absolute bottom-0 left-0 p-2 m-2 bg-[#CF3542] text-white rounded-br-3xl">
                $
                {listing.data.regularPrice ?? listing.data.discountedPrice}
                {listing.data.type === 'rent' && '/ Month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
