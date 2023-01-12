import React, { useState } from "react";

export default function CreateListing() {
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
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnsihed,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
  } = formData;
  const onChange = () => {};
  return (
    <section className="w-full px-5 md:max-w-md mx-auto">
      <h1 className="text-center my-6 text-3xl text-black font-bold">
        Create a Listing
      </h1>
      <form>
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
                !parking
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white shadow-lg"
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
                parking
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white shadow-lg"
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
              id="furnsihed"
              value={true}
              onClick={onChange}
              className={`uppercase text-sm font-medium w-full shadow-md py-3 rounded hover:shadow-lg active:shadow-lg focus:shadow-lg duration-150 transition ease-in-out ${
                !furnsihed
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white shadow-lg"
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
                furnsihed
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white shadow-lg"
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
                !offer
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white shadow-lg"
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
                offer
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white shadow-lg"
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
                min="0"
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
                  min="0"
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
            The first image will be the cover (max 6)
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
        <button type="submit" className="uppercase my-10 text-center w-full px-7 py-3 bg-blue-600 text-white text-md font-medium rounded shadow-md hover:shadow-lg hover:bg-blue-700 focus:bg-blue-800 active:bg-blue-800 transition duration-150 ease-in-out">Create listing</button>
      </form>
    </section>
  );
}
