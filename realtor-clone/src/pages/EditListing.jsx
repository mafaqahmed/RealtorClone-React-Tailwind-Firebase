import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner.jsx";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { serverTimestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";

export default function EditListing() {
    const [listing, setListing] = useState(null)
    const params = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const geolocationEnabled = false;
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: 50,
    discountedPrice: 50,
    latitude: 0,
    longitude: 0,
    images: {},
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
    latitude,
    longitude,
    images,
  } = formData;

useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      toast.error("You can't edit this listing");
      navigate("/");
    }
  }, [listing,auth.currentUser.uid, navigate]);

  useEffect(()=>{
    const fetchListing = async() => {
        setLoading(true);
        const docRef = doc(db, "listings", params.listingId)
        const docSnap = await getDoc(docRef)
        console.log(docSnap.data())
        if (docSnap.exists()) {
            setListing({...docSnap.data()})
            const docSnapCopy = docSnap.data()
            delete docSnapCopy.geolocation
            delete docSnapCopy.timestamp
            setFormData({
                ...docSnapCopy,
                latitude: docSnap.data().geolocation.lat,
                longitude: docSnap.data().geolocation.long
            })
            setLoading(false);
          } else {
            navigate("/");
            toast.error("Listing does not exist");
          }
    }
    fetchListing()
  },[params.listingId, navigate])

  const onChange = (e) => {
    let boolean;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    if (e.target.files) {
      setFormData((prevData) => ({
        ...prevData,
        images: e.target.files,
      }));
    }
    if (!e.target.files) {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    let geolocation = {};
    setLoading(true);

    if (offer) {
      if (+discountedPrice >= +regularPrice) {
        setLoading(false);
        toast.error("Discounted price must be lower than regular price");
        return;
      }
    }

    if (images.length > 6) {
      setLoading(false);
      toast.error("Maximum 6 images are allowed");
      return;
    }

    if (!geolocationEnabled) {
      geolocation.lat = latitude;
      geolocation.long = longitude;
    }

    const uploadImages = async (image) => {
      return new Promise((res, rej) => {
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `${image.name}-${auth.currentUser.uid}-${uuidv4()}`
        );
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                console.log("default");
            }
          },
          (error) => {
            rej(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              res(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) => uploadImages(image))
    ).catch((error) => {
      setLoading(false);
      toast.error(error);
      return;
    });

    const formDataCopy = {
      ...formData,
      geolocation,
      imgUrls,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };

    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;

    console.log(formDataCopy);

    try {
      const docRef = doc(db, "listings", params.listingId);
      await updateDoc(docRef, formDataCopy)
      console.log(docRef);
      setLoading(false);
      toast.success("Listing is edited");
      navigate(`/category/${formDataCopy.type}/${docRef.id}`);
    } catch (error) {
      toast.error(error)
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="w-full px-5 md:max-w-md mx-auto">
      <h1 className="text-center my-6 text-3xl text-black font-bold">
        Edit Listing
      </h1>
      <form onSubmit={onSubmit}>
        <div>
          <p className="text-lg font-semibold">Sell / Rent</p>
          <div className="flex space-x-5">
            <button
              type="button"
              id="type"
              value="sell"
              onClick={onChange}
              className={`uppercase text-sm font-medium w-full shadow-md py-3 rounded hover:shadow-lg active:shadow-lg focus:shadow-lg duration-150 transition ease-in-out ${
                type === "sell"
                  ? "bg-slate-600 text-white shadow-lg"
                  : "bg-white text-black"
              }`}
            >
              Sell
            </button>
            <button
              type="button"
              id="type"
              value="rent"
              onClick={onChange}
              className={`uppercase text-sm font-medium w-full shadow-md py-2=3 rounded hover:shadow-lg active:shadow-lg focus:shadow-lg duration-150 transition ease-in-out ${
                type === "rent"
                  ? "bg-slate-600 text-white shadow-lg"
                  : "bg-white text-black"
              }`}
            >
              rent
            </button>
          </div>
        </div>
        <div className="my-6">
          <p className="text-lg font-semibold">Name</p>
          <input
            type="text"
            id="name"
            value={name}
            onChange={onChange}
            placeholder="Name"
            minLength="10"
            maxLength="32"
            required
            className="w-full px-4 text-lg border bg-white border-slate-300 text-gray-500 rounded transition duration-150 ease-in-out shadow-md focus:shadow-lg focus:border-slate-400 focus:bg-white focus:text-gray-600"
          />
        </div>
        <div className="flex space-x-10 mb-6">
          <div>
            <p className="text-lg font-semibold">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full text-center px-4 text-lg border bg-white border-slate-300 text-gray-500 rounded transition duration-150 ease-in-out shadow-md focus:shadow-lg focus:border-slate-400 focus:bg-white focus:text-gray-600"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">Baths</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full text-center px-4 text-lg border bg-white border-slate-300 text-gray-500 rounded transition duration-150 ease-in-out shadow-md focus:shadow-lg focus:border-slate-400 focus:bg-white focus:text-gray-600"
            />
          </div>
        </div>
        <div>
          <p className="text-lg font-semibold">Parking spot</p>
          <div className="flex space-x-5">
            <button
              type="button"
              id="parking"
              value={true}
              onClick={onChange}
              className={`uppercase text-sm font-medium w-full shadow-md py-3 rounded hover:shadow-lg active:shadow-lg focus:shadow-lg duration-150 transition ease-in-out ${
                parking
                  ? "bg-slate-600 text-white shadow-lg"
                  : "bg-white text-black"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              id="parking"
              value={false}
              onClick={onChange}
              className={`uppercase text-sm font-medium w-full shadow-md py-2=3 rounded hover:shadow-lg active:shadow-lg focus:shadow-lg duration-150 transition ease-in-out ${
                !parking
                  ? "bg-slate-600 text-white shadow-lg"
                  : "bg-white text-black"
              }`}
            >
              No
            </button>
          </div>
        </div>
        <div>
          <p className="text-lg font-semibold mt-6">Furnished</p>
          <div className="flex space-x-5">
            <button
              type="button"
              id="furnished"
              value={true}
              onClick={onChange}
              className={`uppercase text-sm font-medium w-full shadow-md py-3 rounded hover:shadow-lg active:shadow-lg focus:shadow-lg duration-150 transition ease-in-out ${
                furnished
                  ? "bg-slate-600 text-white shadow-lg"
                  : "bg-white text-black"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              id="furnished"
              value={false}
              onClick={onChange}
              className={`uppercase text-sm font-medium w-full shadow-md py-2=3 rounded hover:shadow-lg active:shadow-lg focus:shadow-lg duration-150 transition ease-in-out ${
                !furnished
                  ? "bg-slate-600 text-white shadow-lg"
                  : "bg-white text-black"
              }`}
            >
              No
            </button>
          </div>
        </div>
        <div className="my-6">
          <p className="text-lg font-semibold">Address</p>
          <textarea
            type="text"
            id="address"
            value={address}
            onChange={onChange}
            placeholder="Address"
            required
            className="w-full px-4 text-lg border bg-white border-slate-300 text-gray-500 rounded transition duration-150 ease-in-out shadow-md focus:shadow-lg focus:border-slate-400 focus:bg-white focus:text-gray-600"
          />
        </div>
        {!geolocationEnabled && (
          <div className="flex space-x-10 mb-6">
            <div>
              <p className="text-lg font-semibold">Latitude</p>
              <input
                type="number"
                id="latitude"
                value={latitude}
                onChange={onChange}
                min="-90"
                max="90"
                required={!geolocationEnabled}
                className="w-full text-center px-4 text-lg border bg-white border-slate-300 text-gray-500 rounded transition duration-150 ease-in-out shadow-md focus:shadow-lg focus:border-slate-400 focus:bg-white focus:text-gray-600"
              />
            </div>
            <div>
              <p className="text-lg font-semibold">Longitude</p>
              <input
                type="number"
                id="longitude"
                value={longitude}
                onChange={onChange}
                min="-180"
                max="180"
                required={!geolocationEnabled}
                className="w-full text-center px-4 text-lg border bg-white border-slate-300 text-gray-500 rounded transition duration-150 ease-in-out shadow-md focus:shadow-lg focus:border-slate-400 focus:bg-white focus:text-gray-600"
              />
            </div>
          </div>
        )}
        <div className="my-6">
          <p className="text-lg font-semibold">Description</p>
          <textarea
            type="text"
            id="description"
            value={description}
            onChange={onChange}
            placeholder="Description"
            required
            className="w-full px-4 text-lg border bg-white border-slate-300 text-gray-500 rounded transition duration-150 ease-in-out shadow-md focus:shadow-lg focus:border-slate-400 focus:bg-white focus:text-gray-600"
          />
        </div>
        <div>
          <p className="text-lg font-semibold mt-6">Offer</p>
          <div className="flex space-x-5">
            <button
              type="button"
              id="offer"
              value={true}
              onClick={onChange}
              className={`uppercase text-sm font-medium w-full shadow-md py-3 rounded hover:shadow-lg active:shadow-lg focus:shadow-lg duration-150 transition ease-in-out ${
                offer
                  ? "bg-slate-600 text-white shadow-lg"
                  : "bg-white text-black"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              id="offer"
              value={false}
              onClick={onChange}
              className={`uppercase text-sm font-medium w-full shadow-md py-2=3 rounded hover:shadow-lg active:shadow-lg focus:shadow-lg duration-150 transition ease-in-out ${
                !offer
                  ? "bg-slate-600 text-white shadow-lg"
                  : "bg-white text-black"
              }`}
            >
              No
            </button>
          </div>
        </div>
        <div className="flex items-center my-6">
          <div>
            <p className="text-lg font-semibold">Regular price</p>
            <div className="flex space-x-6 whitespace-nowrap items-center">
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={onChange}
                min="50"
                max="400000000"
                required
                className="w-full text-center px-4 text-lg border bg-white border-slate-300 text-gray-500 rounded transition duration-150 ease-in-out shadow-md focus:shadow-lg focus:border-slate-400 focus:bg-white focus:text-gray-600"
              />
              {type === "rent" && (
                <div>
                  <p className="text-md font-medium w-full">$ / Month</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {offer && (
          <div className="flex items-center mb-6">
            <div>
              <p className="text-lg font-semibold">Discounted price</p>
              <div className="flex justify-center items-center space-x-6  whitespace-nowrap">
                <input
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={onChange}
                  min="50"
                  max="400000000"
                  required={offer}
                  className="w-full text-center px-4 text-lg border bg-white border-slate-300 text-gray-500 rounded transition duration-150 ease-in-out shadow-md focus:shadow-lg focus:border-slate-400 focus:bg-white focus:text-gray-600"
                />
                {type === "rent" && (
                  <div>
                    <p className="text-md font-medium w-full">$ / Month</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div>
          <p className="text-lg font-semibold">Images</p>
          <p className="text-md text-gray-800">
            The first image will be the cover (max 6) adn the iamge size must be less than 2mb
          </p>
          <input
            type="file"
            id="images"
            onChange={onChange}
            accept=".jpg,.png,.jpeg"
            required
            multiple
            className="border border-gray-300 w-full px-3 py-1.5 bg-white focus:bg-white focus:border-slate-400 rounded transition duration-150 ease-in-out hover:shadow-lg hover:border-gray-400"
          />
        </div>
        <button
          type="submit"
          className="uppercase my-10 text-center w-full px-7 py-3 bg-blue-600 text-white text-md font-medium rounded shadow-md hover:shadow-lg hover:bg-blue-700 focus:bg-blue-800 active:bg-blue-800 transition duration-150 ease-in-out"
        >
          Confirm Editing
        </button>
      </form>
    </section>
  );
}
