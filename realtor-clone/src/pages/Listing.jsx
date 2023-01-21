import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
} from "swiper";
import Spinner from "../components/Spinner";
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// Import Swiper styles
import "swiper/css/bundle";
import Contact from "../components/Contact";

export default function Listing() {
  const [copied, setCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const params = useParams();
  SwiperCore.use([Autoplay, Navigation, Pagination]);
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

  if (listing) {
    const {
      name,
      offer,
      discountedPrice,
      regularPrice,
      type,
      imgUrls,
      address,
      description,
      bedrooms,
      bathrooms,
      parking,
      furnished,
      userRef,
      geolocation,
    } = listing;

    const onClick = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => {
        setCopied(false);
        }, 1000);
    }
    return (
      <>
        <Swiper
          className="w-full h-80 relative"
          // install Swiper modules
          modules={[Navigation, Pagination, EffectFade, Autoplay]}
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          autoplay={{ delay: 3000 }}
          effect="fade"
        >
          {imgUrls.map((img, index) => (
            <SwiperSlide
              key={index}
              className="w-full h-full"
              style={{
                background: `url(${img}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></SwiperSlide>
          ))}
        </Swiper>
        <div className="fixed right-10 top-20 z-50 flex flex-col items-center w-24">
          <FaShare
            className="relative rounded-full bg-white text-gray-700 p-3 text-5xl cursor-pointer hover:shadow-lg shadow-md"
            onClick={onClick}
          />
          {copied && <p
            className="relative mt-2 rounded-lg bg-white text-gray-900 px-1 text-sm border border-gray-200"
          >Link Copied!</p>}
        </div>
        <div className="max-w-6xl mx-auto mt-4 p-4 flex md:space-x-5 bg-white shadow-lg flex-col space-y-3 md:space-y-0 md:flex-row">
          <div className="w-full">
            <div className="flex items-center mt-4">
              <p className="text-blue-900 font-bold text-2xl">
                {name} - $
                {offer
                  ? discountedPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : regularPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                {type === "rent" ? " / Month" : ""}
              </p>
            </div>
            <div className="mt-3 flex items-center">
              <FaMapMarkerAlt className="text-green-600 text-lg" />
              <p className=" ml-1 font-medium">{address}</p>
            </div>
            <div className="mt-3 flex items-center space-x-2 w-[75%]">
              <p className="bg-red-800 text-white rounded-md text-center py-1 shadow-lg font-medium w-full">
                For {type === "rent" ? "Rent" : "Sale"}
              </p>
              {offer && (
                <p className="bg-green-800 text-white rounded-md text-center py-1 shadow-lg font-medium w-full">
                  ${regularPrice - discountedPrice} Discount{" "}
                  {type === "rent" ? "/ Month" : ""}
                </p>
              )}
            </div>
            <div className="mt-3">
              <span className="font-medium">Description - </span>
              {description}
            </div>
            <div className="mt-3 flex items-center space-x-10">
              <div className="flex items-center whitespace-nowrap">
                <FaBed />
                <p className="ml-1 text-sm font-medium">
                  {bedrooms === "1" ? "1 bed" : `${bedrooms} beds`}
                </p>
              </div>
              <div className="flex items-center whitespace-nowrap">
                <FaBath />
                <p className="ml-1 text-sm font-medium">
                  {bathrooms === "1" ? "1 bed" : `${bathrooms} beds`}
                </p>
              </div>
              <div className="flex items-center whitespace-nowrap">
                <FaParking />
                <p className="ml-1 text-sm font-medium">
                  {parking ? "Parking" : "No Parking"}
                </p>
              </div>
              <div className="flex items-center whitespace-nowrap">
                <FaChair />
                <p className="ml-1 text-sm font-medium">
                  {furnished ? "Furnished" : "Not Furnished"}
                </p>
              </div>
            </div>
            {userRef !== auth.currentUser.uid && !contactLandlord && (
              <button
                onClick={() => {
                  setContactLandlord(true);
                }}
                className="mt-5 w-full text-center text-white font-semibold bg-blue-600 py-2 text-lg rounded shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-800 focus:shadow-xl"
              >
                Contact Landlord
              </button>
            )}
            <div className="mt-5 w-full">
              {contactLandlord && <Contact listing={listing} />}
            </div>
          </div>
          <div className="w-full border border-black h-80">
            <MapContainer
              center={[geolocation.lat, geolocation.long]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[geolocation.lat, geolocation.long]}>
                <Popup>{address}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </>
    );
  }
}
